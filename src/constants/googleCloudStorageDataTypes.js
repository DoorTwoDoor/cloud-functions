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
 * Google Cloud Storage data types module.
 *
 * @module GoogleCloudStorageDataTypes
 */

/**
 * Stores the content type for images.
 *
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @readonly
 */
const IMAGE_CONTENT_TYPE = 'image/';

/**
 * Stores the resource states for object creation, deletion, moves and updates.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @readonly
 */
const RESOURCE_STATES = {
  OBJECT_CREATION_AND_UPDATES: 'exists',
  OBJECT_DELETION_AND_MOVES: 'not_exists',
};

/**
 * Stores the thumbnail metadata for large, medium and small thumbnails.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
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

/**
 * Stores the URI scheme for Google Cloud Storage.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @readonly
 */
const URI_SCHEME = 'gs';

export {
  IMAGE_CONTENT_TYPE,
  RESOURCE_STATES,
  THUMBNAIL_METADATA,
  URI_SCHEME,
};
