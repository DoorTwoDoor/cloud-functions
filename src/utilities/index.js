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
  applyImageTransformations,
  blurImage,
  generateThumbnail,
  isImage,
  isOffensiveImage,
  isThumbnail,
} from './images';
import {
  deleteFile,
  getDirectoryName,
  getExtensionName,
  getFileName,
  getTemporaryFilePath,
  joinPaths,
  makeDirectory,
} from './fileSystem';

import { getPromiseFromWritableStream } from './streams';

export {
  applyImageTransformations,
  blurImage,
  deleteFile,
  generateThumbnail,
  getDirectoryName,
  getExtensionName,
  getFileName,
  getPromiseFromWritableStream,
  getTemporaryFilePath,
  isImage,
  isOffensiveImage,
  isThumbnail,
  joinPaths,
  makeDirectory,
};
