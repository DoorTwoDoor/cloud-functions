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
  getDirectoryName,
  getExtensionName,
  getFileName,
  getFunctionNameFromFilePath,
  getMatchingFilePaths,
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
} from './images';
import {
  getGoogleCloudStorageURI,
  getReadStream,
  getWriteStream,
  setMetadata,
} from './googleCloudStorage';

import { getPromiseFromWritableStream } from './streams';

export {
  deleteFile,
  generateThumbnails,
  getDirectoryName,
  getExtensionName,
  getFileName,
  getFunctionNameFromFilePath,
  getGoogleCloudStorageURI,
  getMatchingFilePaths,
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
};
