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
  getTemporaryFilePath,
  getThumbnailFileName,
  joinPaths,
} from './fileSystem';
import {
  generateThumbnails,
  isImage,
  isOffensiveImage,
  isThumbnail,
  moderateImage,
} from './images';
import {
  getGoogleCloudStorageURI,
  getReadStream,
  getWriteStream,
} from './googleCloudStorage';

import { getPromiseFromWritableStream } from './streams';

export {
  deleteFile,
  generateThumbnails,
  getDirectoryName,
  getExtensionName,
  getFileName,
  getGoogleCloudStorageURI,
  getPromiseFromWritableStream,
  getReadStream,
  getTemporaryFilePath,
  getThumbnailFileName,
  getWriteStream,
  isImage,
  isOffensiveImage,
  isThumbnail,
  joinPaths,
  moderateImage,
};
