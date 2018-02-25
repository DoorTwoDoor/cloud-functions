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
  applyImageTransformations,
  blurImage,
  generateThumbnail,
  getDirectoryName,
  getExtensionName,
  getFileName,
  getGoogleCloudStorageURI,
  getPromiseFromWritableStream,
  getReadStream,
  getThumbnailFileName,
  getWriteStream,
  isImage,
  isOffensiveImage,
  isThumbnail,
  joinPaths,
} from '../../utilities';

/**
 * Blurs the given image located in the given bucket using ImageMagick.
 * 
 * @memberof ProfileImageProcessing
 * @private
 */
function generateThumbnails({
  filePath,
  bucketName,
  contentType,
  metadata,
  shouldBlur,
}) {
  // Stores the file name of the image.
  const fileName = getFileName({
    filePath,
    includeFileExtension: false,
  });

  // Stores the extension name of the image.
  const extensionName = getExtensionName(filePath);

  // Stores the directory name of the image.
  const directoryName = getDirectoryName(filePath);

  const promises = Object.keys(THUMBNAIL_METADATA).map(key => {
    const {
      size,
      suffix,
    } = THUMBNAIL_METADATA[key];

    const imageDownloadStream = getReadStream({
      bucketName,
      filePath,
    });
    
    const imageTransformations = shouldBlur?
      [ blurImage, generateThumbnail ]: [ generateThumbnail ];
      
    const imageProcessingStream = applyImageTransformations({
      initialReadableStream: imageDownloadStream,
      imageTransformations,
      size,
    }); 
    
    const thumbnailFileName = getThumbnailFileName({
      extensionName,
      fileName,
      suffix,
    });
    
    const thumbnailFilePath = joinPaths([ directoryName, thumbnailFileName ]);
    
    const options = {
      metadata: {
        contentType,
        metadata,
      },
    };

    const thumbnailUploadStream = getWriteStream({
        bucketName,
        filePath: thumbnailFilePath,
        options,
      });
    
    imageProcessingStream.pipe(thumbnailUploadStream);
    
    return getPromiseFromWritableStream(thumbnailUploadStream);
  });

  return Promise.all(promises);
}

/**
 * 
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
        
    // Stores whether the image contains offensive content and should be blur. 
    const shouldBlur = await isOffensiveImage(googleCloudStorageURI);
  
    // Generates thumbnails and blurs them if necessary.
    await generateThumbnails({
      filePath,
      bucketName,
      contentType,
      metadata,
      shouldBlur,
    });
  
  } catch (error) {
    
    console.error(error);
  
  }
}

const processProfileImage = 
  firebaseFunctions
  .storage
  .object()
  .onChange(event => handleChangeEvent(event));

export default processProfileImage;
