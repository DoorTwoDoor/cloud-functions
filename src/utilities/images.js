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
  IMAGE_CONTENT_TYPE,
  LIKELIHOODS,
  THUMBNAIL_METADATA,
} from '../constants';

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
 * Applies the given image transformations on an image.
 * 
 * @memberof Images
 * @public
 */
function applyImageTransformations({
  initialReadableStream,
  imageTransformations,
  size,
}) {
  return imageTransformations.reduce((readableStream, transformFunction) => {
    if (transformFunction.length === 2) {
      return transformFunction(readableStream, size);
    }
    
    return transformFunction(readableStream);
  }, initialReadableStream);
}

/**
 * Blurs an image.
 * 
 * @memberof Images
 * @public
 */
function blurImage(readableStream) {
  // Stores a writable stream to blur an image.
  const writableStream = sharp().blur();

  return readableStream.pipe(writableStream);
}

/**
 * Generates a thumbnail for the given size.
 * 
 * @memberof Images
 * @public
 */
function generateThumbnail(readableStream, size) {
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

    // Destructures the very likely property from the likelihoods.
    const { VERY_LIKELY } = LIKELIHOODS;
    
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

    return (adult === VERY_LIKELY) || (violence === VERY_LIKELY);

  } catch (error) {
    
    console.log(error);

  }
}
/* eslint-enable consistent-return */

/**
 * Checks if a file is a thumbnail.
 * 
 * @memberof Images
 * @public
 */
function isThumbnail(fileName) {
  /*
   * Destructures the large, medium and small thumbnail suffix properties
   * from the thumbnail metadata.
   */
  const {
    LARGE: { suffix: LARGE_THUMBNAIL_SUFFIX },
    MEDIUM: { suffix: MEDIUM_THUMBNAIL_SUFFIX },
    SMALL: { suffix: SMALL_THUMBNAIL_SUFFIX },
  } = THUMBNAIL_METADATA;

  return (
    fileName.endsWith(LARGE_THUMBNAIL_SUFFIX) ||
    fileName.endsWith(MEDIUM_THUMBNAIL_SUFFIX) ||
    fileName.endsWith(SMALL_THUMBNAIL_SUFFIX)
  );
}

export {
  applyImageTransformations,
  blurImage,
  generateThumbnail,
  isImage,
  isOffensiveImage,
  isThumbnail,
};
