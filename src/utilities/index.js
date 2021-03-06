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
  deleteFiles,
  getDefaultBucketName,
  getDownloadURL,
  getGoogleCloudStorageURI,
  getReadStream,
  getWriteStream,
  setMetadata,
} from './googleCloudStorage';
import {
  deleteProfileImageForUser,
  generateThumbnails,
  isDefaultProfileImage,
  isImage,
  isOffensiveImage,
  isProfileImage,
  markImageAsModerated,
  moderateImage,
  updateProfileImageURLForUser,
} from './images';
import {
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
  getDocumentReference,
  remove,
  runTransaction,
  set,
} from './cloudFirestore';

import { getPromiseFromWritableStream } from './streams';

export {
  createUserInFirestore,
  deleteFiles,
  deleteProfileImageForUser,
  deleteUserFromFirestore,
  generateThumbnails,
  getBaseName,
  getDefaultBucketName,
  getDirectoryPath,
  getDocumentReference,
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
  getWriteStream,
  isDefaultProfileImage,
  isImage,
  isOffensiveImage,
  isProfileImage,
  joinPaths,
  markImageAsModerated,
  moderateImage,
  remove,
  runTransaction,
  set,
  setMetadata,
  updateProfileImageURLForUser,
  updateUser,
};
