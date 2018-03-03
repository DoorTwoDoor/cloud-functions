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
 * Image data types module.
 *
 * @module ImageDataTypes
 */

/**
 * Stores the blur factor for moderating images.
 *
 * @constant
 * @default
 * @memberof ImageDataTypes
 * @public
 * @readonly
 */
const BLUR_FACTOR = 10;

/**
 * Stores the content type for images.
 *
 * @constant
 * @default
 * @memberof ImageDataTypes
 * @public
 * @readonly
 */
const IMAGE_CONTENT_TYPE = 'image/';

/**
 * Stores the thumbnail metadata for large, medium and small thumbnails.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @public
 * @readonly 
 */
const THUMBNAIL_METADATA = {
  LARGE: {
    size: { height: 200, width: 200 },
    suffix: 'large',
  },
  MEDIUM: {
    size: { height: 100, width: 100 },
    suffix: 'medium',
  },
  SMALL: {
    size: { height: 50, width: 50 },
    suffix: 'small',
  },
};

export {
  BLUR_FACTOR,
  IMAGE_CONTENT_TYPE,
  THUMBNAIL_METADATA,
};
