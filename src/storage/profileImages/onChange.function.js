/*
 * Copyright 2017-present, DoorTwoDoor, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-style license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @flow
 */

/**
 * Profile image processing module.
 *
 * @module ProfileImageProcessing
 */

// import * as firebaseAdmin from 'firebase-admin';
import * as firebaseFunctions from 'firebase-functions';

import {
  RESOURCE_STATES,
  THUMBNAIL_METADATA,
} from '../../constants';
import {
  generateThumbnails,
  getFileName,
  getGoogleCloudStorageURI,
  isImage,
  isOffensiveImage,
  markImageAsModerated,
  moderateImage,
} from '../../utilities';

// firebaseAdmin.initializeApp(firebaseFunctions.config().firebase);

/**
 * Handles a Google Cloud Storage change event.
 * 
 * @async
 * @memberof ProfileImageProcessing
 * @private
 */
async function handleChangeEvent({
  data: {
    bucket: bucketName,
    contentType,
    metadata,
    metageneration,
    name: filePath,
    resourceState,
  },
}) {
  try {    
    if (!isImage(contentType)) { // Is object not an image?
      return;
    }

    const { isModerated = false } = metadata;

    if (isModerated) { // Is image already moderated?
      return;
    }
  
    // Destructures the object deletion and moves property from the resource state
    const {
      OBJECT_CREATION_AND_UPDATES,
      OBJECT_DELETION_AND_MOVES,
    } = RESOURCE_STATES;
    
    if (resourceState === OBJECT_DELETION_AND_MOVES) { // Is object deleted or moved?
      return;
    }
  
    if (resourceState === OBJECT_CREATION_AND_UPDATES &&
        metageneration > 1) { // Is object new?
      return;
    }

    // Stores the Google Cloud Storage URI to the image.
    const googleCloudStorageURI = getGoogleCloudStorageURI({
      bucketName,
      filePath,
    });
        
    /*
     * Stores whether the image contains offensive content and should
     * be moderated. 
     */
    const containsOffensiveContent =
      await isOffensiveImage(googleCloudStorageURI);

    if (containsOffensiveContent) { // Image contains offensive content?
      // Moderates the image.
      await moderateImage({
        bucketName,
        contentType,
        filePath,
        metadata,
      });
    } else {
      // Marks the image as moderated.
      await markImageAsModerated({
        bucketName,
        contentType,
        filePath,
        metadata,
      });
    }
  
    // Generates thumbnails.
    await generateThumbnails({
      bucketName,
      contentType,
      filePath,
      metadata,
    });

    return;

    // firebaseAdmin.auth().updateUser(uid, { photoURL: "" });
  
  } catch (error) {
    
    console.error(error);
  
  }
}

/**
 * Stores the cloud function, which fires every time a Google Cloud Storage
 * change occurs.
 * 
 * @constant
 * @memberof ProfileImageProcessing
 * @public
 * @readonly
 */
const processProfileImage = firebaseFunctions
  .storage
  .object()
  .onChange(event => handleChangeEvent(event));

export default processProfileImage;
