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

import * as firebaseFunctions from 'firebase-functions';

import {
  RESOURCE_STATES,
  THUMBNAIL_METADATA,
} from '../../constants';
import {
  generateThumbnails,
  getFileName,
  getGoogleCloudStorageURI,
  isDefaultProfileImage,
  isImage,
  isOffensiveImage,
  isProfileImage,
  markImageAsModerated,
  moderateImage,
  updateProfileImageURLForUser,
} from '../../utilities';

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
    /*
     * Destructures the object deletion and moves property from the
     * resource state.
     */
    const {
      OBJECT_CREATION_AND_UPDATES,
      OBJECT_DELETION_AND_MOVES,
    } = RESOURCE_STATES;
    
    if (resourceState === OBJECT_DELETION_AND_MOVES) { // Is object deleted or moved?
      return;
    }
  
    if (resourceState === OBJECT_CREATION_AND_UPDATES &&
        metageneration > 1) { // Is object not new?
      return;
    }

    if (!isImage(contentType)) { // Is object not an image?
      return;
    }

    if (!isProfileImage(filePath)) { // Is image not a profile image?
      return;
    }

    if (isDefaultProfileImage(filePath)) { // Is image a default profile image?
      return;
    }

    /*
     * Destructures the is moderated property from the metadata and sets it to
     * false if it is undefined.
     */
    const { isModerated = false } = metadata;

    if (isModerated) { // Is image already moderated?
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
  
    // Stores the array of promises.
    const promises = [
      // Generates thumbnails.
      generateThumbnails({
        bucketName,
        contentType,
        filePath,
        metadata,
      }),
      // Updates the profile image URL for the user.
      updateProfileImageURLForUser({
        bucketName,
        filePath,
      }),
    ];

    // Executes thumbnail generation and profile image URL update in parallel.
    await Promise.all(promises);

    return;
  
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
