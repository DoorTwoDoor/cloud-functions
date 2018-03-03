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
  getDownloadURL,
  getGoogleCloudStorageURI,
  getReadStream,
  getWriteStream,
  setMetadata,
} from './googleCloudStorage';

import { getPromiseFromWritableStream } from './streams';
import { update } from './cloudFirestore';
import { updateUser } from './authentication';

export {
  deleteFile,
  generateThumbnails,
  getBaseName,
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
  getWriteStream,
  isImage,
  isOffensiveImage,
  joinPaths,
  markImageAsModerated,
  moderateImage,
  setMetadata,
  update,
  updatePhotoURLForUser,
  updateUser,
};
