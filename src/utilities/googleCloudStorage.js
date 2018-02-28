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
 * Google Cloud Storage module.
 *
 * @module GoogleCloudStorage
 */

import { URI_SCHEME } from '../constants';
import googleCloudStorage from '@google-cloud/storage';

/**
 * Stores the storage client.
 * 
 * @constant
 * @memberof GoogleCloudStorage
 * @private
 * @readonly
 */
const storageClient = googleCloudStorage();

/**
 * Gets the Google Cloud Storage URI to the given file in the given bucket.
 * 
 * @memberof GoogleCloudStorage
 * @public
 */
function getGoogleCloudStorageURI({
  bucketName,
  filePath,
}) {
  return `${URI_SCHEME}://${bucketName}/${filePath}`;
}

/**
 * Gets a readable stream to read the contents of the remote file.
 * 
 * @memberof GoogleCloudStorage
 * @public
 */
function getReadStream({
  bucketName,
  filePath,
  options,
}) {
  return storageClient
    .bucket(bucketName)
    .file(filePath)
    .createReadStream(options);
}

/**
 * Gets a writable stream to overwrite the contents of the remote file.
 * 
 * @memberof GoogleCloudStorage
 * @public
 */
function getWriteStream({
  bucketName,
  filePath,
  options,
}) {
  return storageClient
    .bucket(bucketName)
    .file(filePath)
    .createWriteStream(options);
}

/**
 * Merge the given metadata with the current remote file's metadata.
 * 
 * @memberof GoogleCloudStorage
 * @public
 */
function setMetadata({
  bucketName,
  filePath,
  metadata,
}) {
  return storageClient
    .bucket(bucketName)
    .file(filePath)
    .setMetadata(metadata);
}

export {
  getGoogleCloudStorageURI,
  getReadStream,
  getWriteStream,
  setMetadata,
};
