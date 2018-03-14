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

import camelCase from 'camelcase';
import glob from 'glob';
import os from 'os';
import path from 'path';

/**
 * Gets the base name of a file path.
 * 
 * @memberof FileSystem
 * @public
 */
function getBaseName(filePath) {
  return path.basename(filePath);
}

/**
 * Gets the directory path of a file path.
 * 
 * @memberof FileSystem
 * @public
 */
function getDirectoryPath(filePath) {
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
    return getBaseName(filePath);
  }
  
  // Stores the file name of the file path.
  const [ fileName ] = getBaseName(filePath).split('.');

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
function getMatchingFilePaths({
  cwd,
  ignore,
  pattern,
}) {
  // Stores the options for pattern matching behaviour.
  const options = {
    cwd,
    ignore,
  };
  
  return glob.sync(pattern, options);
}

/**
 * Gets the parent directory name of a file path.
 * 
 * @memberof FileSystem
 * @public
 */
function getParentDirectoryName(filePath) {
  // Stores the directory path of the file path.
  const directoryPath = getDirectoryPath(filePath);

  return getBaseName(directoryPath);
}

/**
 * Gets the file path of the temporary file.
 * 
 * @memberof FileSystem
 * @public
 */
function getTemporaryFilePath(filePath) {
  return joinPaths([ os.tempdir(), filePath ]);
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
};
