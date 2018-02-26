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
  isImage,
  isOffensiveImage,
  isThumbnail,
  moderateImage,
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
    if (!isImage(contentType)) { // Is object not an image?
      return;
    }
  
    // Stores the file name of the image.
    const fileName = getFileName({
      filePath,
      includeFileExtension: false,
    });
    
    if (isThumbnail(fileName)) { // Is image already a thumbnail?
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
        
    // Stores whether the image contains offensive content and should be moderated. 
    const shouldModerate = await isOffensiveImage(googleCloudStorageURI);

    if (shouldModerate) { // Should moderate the image?
      // Moderates the image.
      await moderateImage({
        bucketName,
        contentType,
        filePath,
        metadata,
      });
    }
  
    // Generates thumbnails and blurs them if necessary.
    await generateThumbnails({
      filePath,
      bucketName,
      contentType,
      metadata,
    });
  
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
const processProfileImage = 
  firebaseFunctions
  .storage
  .object()
  .onChange(event => handleChangeEvent(event));

export default processProfileImage;
