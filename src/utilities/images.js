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
 * Images module.
 *
 * @module Images
 */

import {
  BLUR_FACTOR,
  COLLECTION_PATHS,
  IMAGE_CONTENT_TYPE,
  LIKELIHOODS,
  THUMBNAIL_METADATA,
} from '../constants';
import {
  getDirectoryPath,
  getDownloadURL,
  getExtensionName,
  getFileName,
  getParentDirectoryName,
  getPromiseFromWritableStream,
  getReadStream,
  getThumbnailFileName,
  getWriteStream,
  joinPaths,
  set,
  setMetadata,
  updateUser,
} from '.';

import googleCloudVision from '@google-cloud/vision';
import sharp from 'sharp';

/**
 * Stores the image annotator client.
 * 
 * @constant
 * @memberof Images
 * @private
 * @readonly
 */
const imageAnnotatorClient = new googleCloudVision.ImageAnnotatorClient();

/**
 * Blurs an image.
 * 
 * @memberof Images
 * @private
 */
function blurImage(readableStream) {
  // Stores a writable stream to blur an image.
  const writableStream = sharp().blur(BLUR_FACTOR);

  return readableStream.pipe(writableStream);
}

/**
 * Generates a thumbnail for the given size.
 * 
 * @memberof Images
 * @private
 */
function generateThumbnail({
  readableStream,
  size,
}) {
  // Destructures the height and width properties from the size object.
  const {
    height,
    width,
  } = size;

  // Stores a writable stream to generate a thumbnail.
  const writableStream = sharp().resize(width, height);

  return readableStream.pipe(writableStream);
}

/**
 * Generates thumbnails for large, medium and small sizes.
 * 
 * @memberof Images
 * @public
 */
function generateThumbnails({
  bucketName,
  contentType,
  filePath,
  metadata,
}) {
  // Stores the directory path of the image.
  const directoryPath = getDirectoryPath(filePath);

  // Stores the extension name of the image.
  const extensionName = getExtensionName(filePath);

  // Stores the file name of the image.
  const fileName = getFileName({
    filePath,
    includeFileExtension: false,
  });

  // Stores the array of promises.
  const promises = Object.keys(THUMBNAIL_METADATA).map(key => {
    /*
     * Destructures the large, medium and small thumbnail properties from
     * the thumbnail metadata.
     */
    const {
      size,
      suffix,
    } = THUMBNAIL_METADATA[key];

    // Gets the image download stream.
    const imageDownloadStream = getReadStream({
      bucketName,
      filePath,
    });
    
    // Generates the thumbnail for the given size.
    const imageProcessingStream = generateThumbnail({
      readableStream: imageDownloadStream,
      size,
    });
    
    // Stores the thumbnail file name.
    const thumbnailFileName = getThumbnailFileName({
      extensionName,
      fileName,
      suffix,
    });
    
    // Stores the thumbnail file path.
    const thumbnailFilePath = joinPaths([ directoryPath, thumbnailFileName ]);
    
    // Stores the configuration options.
    const options = {
      metadata: {
        contentType,
        metadata: {
          ...metadata,
          isModerated: true,
        },
      },
    };

    // Gets the thumbnail upload stream.
    const imageUploadStream = getWriteStream({
        bucketName,
        filePath: thumbnailFilePath,
        options,
      });
    
    // Attaches the image upload stream to the image processing stream.
    imageProcessingStream.pipe(imageUploadStream);
    
    return getPromiseFromWritableStream(imageUploadStream);
  });

  return Promise.all(promises);
}

/**
 * Gets the annotation for an image with safe search detection.
 * 
 * @memberof Images
 * @private
 */
function getSafeSearchAnnotation(image) {
  return imageAnnotatorClient.safeSearchDetection(image);
}

/**
 * Checks if a file is an image.
 * 
 * @memberof Images
 * @public
 */
function isImage(contentType) {
  return contentType.startsWith(IMAGE_CONTENT_TYPE);
}

/**
 * Checks if an image contains adult or violent content.
 * 
 * @async
 * @memberof Images
 * @public
 */
/* eslint-disable consistent-return */
async function isOffensiveImage(image) {
  try {
    
    // Stores the annotate image response.
    const [ annotateImageResponse ] = await getSafeSearchAnnotation(image);

    // Destructures the likely property from the likelihoods.
    const { LIKELY } = LIKELIHOODS;
    
    /*
     * Destructures the safe-search annotation property from the annotate
     * image response.
     */
    const {
      safeSearchAnnotation: {
        adult,
        violence,
      },
    } = annotateImageResponse;

    return (LIKELIHOODS[adult] >= LIKELY || LIKELIHOODS[violence] >= LIKELY);

  } catch (error) {
    
    console.error(error);

  }
}
/* eslint-enable consistent-return */

/**
 * Updates an image's metadata to indicate that it is already moderated.
 * 
 * @memberof Images
 * @public
 */
function markImageAsModerated({
  bucketName,
  contentType,
  filePath,
  metadata,
}) {
  // Stores the configuration options.
  const options = {
    metadata: {
      contentType,
      metadata: {
        ...metadata,
        isModerated: true,
      },
    },
  };

  return setMetadata({
    bucketName,
    filePath,
    metadata: options,
  });
}

/**
 * Moderates an image.
 * 
 * @memberof Images
 * @public
 */
function moderateImage({
  bucketName,
  contentType,
  filePath,
  metadata,
}) {
  // Gets the image download stream.
  const imageDownloadStream = getReadStream({
    bucketName,
    filePath,
  });

  // Blurs the image.
  const imageProcessingStream = blurImage(imageDownloadStream);

  // Stores the configuration options.
  const options = {
    metadata: {
      contentType,
      metadata: {
        ...metadata,
        isModerated: true,
      },
    },
  };

  // Gets the image upload stream.
  const imageUploadStream = getWriteStream({
    bucketName,
    filePath,
    options,
  });

  // Attaches the image upload stream to the image processing stream.
  imageProcessingStream.pipe(imageUploadStream);

  return getPromiseFromWritableStream(imageUploadStream);
}

/**
 * Updates the photo URL for a user.
 * 
 * @memberof Images
 * @public
 */
function updatePhotoURLForUser({
  bucketName,
  filePath,
  userID,
}) {
  // Stores the user's ID.
  const uid = userID? userID: getParentDirectoryName(filePath);

  // Store the photo URL.
  const photoURL = getDownloadURL({
    bucketName,
    filePath,
  });

  // Destructures the users property from the collection paths.
  const { USERS } = COLLECTION_PATHS;

  // Stores the array of promises.
  const promises = [
    // Updates the photo URL for the user in Authentication.
    updateUser({
      userID: uid,
      value: { photoURL },
    }),
    // Sets the photo URL for the user in Firestore.
    set({
      collectionPath: USERS,
      documentPath: uid,
      value: { photoURL },
    }),
  ];

  return Promise.all(promises);
}

export {
  generateThumbnails,
  isImage,
  isOffensiveImage,
  markImageAsModerated,
  moderateImage,
  updatePhotoURLForUser,
};
