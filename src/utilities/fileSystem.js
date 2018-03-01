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
 * File system module.
 *
 * @module FileSystem
 */

import { NODE_MODULES_FILE_PATH } from '../constants';
import camelCase from 'camelcase';
import fs from 'fs';
import glob from 'glob';
import os from 'os';
import path from 'path';

/**
 * Deletes a file with the given file path.
 * 
 * @memberof FileSystem
 * @public
 */
function deleteFile(filePath) {
  return fs.unlink(filePath);
}

/**
 * Gets the directory name of a file path.
 * 
 * @memberof FileSystem
 * @public
 */
function getDirectoryName(filePath) {
  return path.dirname(filePath);
}

/**
 * Gets the extension name of a file path.
 * 
 * @memberof FileSystem
 * @public
 */
function getExtensionName(filePath) {
  return path.extname(filePath);
}

/**
 * Gets the file name of a file path.
 * 
 * @memberof FileSystem
 * @public
 */
function getFileName({
  filePath,
  includeFileExtension,
}) {
  if (includeFileExtension) {
    return path.basename(filePath);
  }
  
  // Stores the file name of the file path.
  const [ fileName ] = path.basename(filePath).split('.');

  return fileName;
}

/**
 * Gets the function name corresponding to the file path.
 * 
 * @memberof FileSystem
 * @public
 */
function getFunctionNameFromFilePath(filePath) {
  return camelCase(filePath.slice(0, -12).split('/').join('-'));
}

/**
 * Gets the file paths found matching the pattern.
 * 
 * @memberof FileSystem
 * @public
 */
function getMatchingFilePaths(pattern) {
  // Stores the options for pattern matching behaviour.
  const options = {
    cwd: __dirname,
    ignore: NODE_MODULES_FILE_PATH,
  };
  
  return glob.sync(pattern, options);
}

/**
 * Gets the file path of the temporary file.
 * 
 * @memberof FileSystem
 * @public
 */
function getTemporaryFilePath(filePath) {
  return joinPaths([os.tempdir(), filePath]);
}

/**
 * Gets the thumbnail file name.
 * 
 * @memberof FileSystem
 * @public
 */
function getThumbnailFileName({
  extensionName,
  fileName,
  suffix,
}) {
  return `${fileName}_${suffix}${extensionName}`
}

/**
 * Joins paths together into a single path.
 * 
 * @memberof FileSystem
 * @public
 */
function joinPaths(paths) {
  return path.join(...paths);
}

export {
  deleteFile,
  getDirectoryName,
  getExtensionName,
  getFileName,
  getFunctionNameFromFilePath,
  getMatchingFilePaths,
  getTemporaryFilePath,
  getThumbnailFileName,
  joinPaths,
};
