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
 * Utilities module.
 *
 * @module Utilities
 */

import {
  createUserInFirestore,
  deleteUserFromFirestore,
  updateUser,
} from './authentication';
import {
  deleteFile,
  getBaseName,
  getDirectoryPath,
  getExtensionName,
  getFileName,
  getFunctionNameFromFilePath,
  getMatchingFilePaths,
  getParentDirectoryName,
  getTemporaryFilePath,
  getThumbnailFileName,
  joinPaths,
} from './fileSystem';
import {
  generateThumbnails,
  isImage,
  isOffensiveImage,
  markImageAsModerated,
  moderateImage,
  updatePhotoURLForUser,
} from './images';
import {
  getDefaultBucketName,
  getDownloadURL,
  getGoogleCloudStorageURI,
  getReadStream,
  getWriteStream,
  setMetadata,
} from './googleCloudStorage';
import {
  remove,
  set,
} from './cloudFirestore';

import { getPromiseFromWritableStream } from './streams';
import { getTimestampFromUTCTime } from './dateTime';

export {
  createUserInFirestore,
  deleteFile,
  deleteUserFromFirestore,
  generateThumbnails,
  getBaseName,
  getDefaultBucketName,
  getDirectoryPath,
  getDownloadURL,
  getExtensionName,
  getFileName,
  getFunctionNameFromFilePath,
  getGoogleCloudStorageURI,
  getMatchingFilePaths,
  getParentDirectoryName,
  getPromiseFromWritableStream,
  getReadStream,
  getTemporaryFilePath,
  getThumbnailFileName,
  getTimestampFromUTCTime,
  getWriteStream,
  isImage,
  isOffensiveImage,
  joinPaths,
  markImageAsModerated,
  moderateImage,
  remove,
  set,
  setMetadata,
  updatePhotoURLForUser,
  updateUser,
};
