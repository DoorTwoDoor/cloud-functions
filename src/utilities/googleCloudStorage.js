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

import {
  DOWNLOAD_URL_BASE,
  FIREBASE_APP,
  URI_SCHEME,
} from '../constants';

import googleCloudStorage from '@google-cloud/storage';

/**
 * Stores the Google Cloud Storage client.
 * 
 * @constant
 * @memberof GoogleCloudStorage
 * @private
 * @readonly
 */
const googleCloudStorageClient = googleCloudStorage();

/**
 * Stores the Firebase Cloud Storage client.
 * 
 * @constant
 * @memberof GoogleCloudStorage
 * @private
 * @readonly
 */
const firebaseCloudStorageClient = FIREBASE_APP.storage();

/**
 * Gets the name of the default bucket.
 * 
 * @memberof GoogleCloudStorage
 * @public
 */
function getDefaultBucketName() {
  return firebaseCloudStorageClient.bucket().name;
}

/**
 * Gets the download URL for the given file in the given bucket.
 * 
 * @memberof GoogleCloudStorage
 * @public
 */
function getDownloadURL({
  bucketName,
  filePath,
}) {
  const encodedFilePath = encodeURIComponent(filePath);
  
  return `${DOWNLOAD_URL_BASE}/${bucketName}/o/${encodedFilePath}?alt=media`;
}

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
  return googleCloudStorageClient
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
  return googleCloudStorageClient
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
  return googleCloudStorageClient
    .bucket(bucketName)
    .file(filePath)
    .setMetadata(metadata);
}

export {
  getDefaultBucketName,
  getDownloadURL,
  getGoogleCloudStorageURI,
  getReadStream,
  getWriteStream,
  setMetadata,
};
