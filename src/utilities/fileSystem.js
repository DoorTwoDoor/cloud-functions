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

import fs from 'fs';
import mkdirpPromise from 'mkdirp-promise';
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
 * Gets the file path of the temporary file.
 * 
 * @memberof FileSystem
 * @public
 */
function getTemporaryFilePath(filePath) {
  return joinPaths([os.tempdir(), filePath]);
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

/**
 * Makes a directory with the given name.
 * 
 * @memberof FileSystem
 * @public 
 */
function makeDirectory(directoryName) {
  return mkdirpPromise(directoryName);
}

export {
  deleteFile,
  getDirectoryName,
  getExtensionName,
  getFileName,
  getTemporaryFilePath,
  joinPaths,
  makeDirectory,
};
