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
 * Stores the file path of the default profile image.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @public
 * @readonly
 */
const DEFAULT_PROFILE_IMAGE_FILE_PATH = 'profileImages/default/ryRuAE5Oz.jpg';

/**
 * Stores the download URL base.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @public
 * @readonly
 */
const DOWNLOAD_URL_BASE = 'https://firebasestorage.googleapis.com/v0/b';

/**
 * Stores the resource states for object creation, deletion, moves and updates.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @public
 * @readonly
 */
const RESOURCE_STATES = {
  OBJECT_CREATION_AND_UPDATES: 'exists',
  OBJECT_DELETION_AND_MOVES: 'not_exists',
};

/**
 * Stores the URI scheme for Google Cloud Storage.
 * 
 * @constant
 * @default
 * @memberof GoogleCloudStorageDataTypes
 * @public
 * @readonly
 */
const URI_SCHEME = 'gs';

export {
  DEFAULT_PROFILE_IMAGE_FILE_PATH,
  DOWNLOAD_URL_BASE,
  RESOURCE_STATES,
  URI_SCHEME,
};
