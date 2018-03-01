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
 * File system data types module.
 *
 * @module FileSystemDataTypes
 */

/**
 * Stores the file path to the files containing cloud functions.
 *
 * @constant
 * @default
 * @memberof FileSystemDataTypes
 * @readonly
 */
const CLOUD_FUNCTIONS_FILE_PATH = './**/*.function.js';

/**
 * Stores the file path to the directory containing Node modules.
 *
 * @constant
 * @default
 * @memberof FileSystemDataTypes
 * @readonly
 */
const NODE_MODULES_FILE_PATH = './node_modules/**';

export {
  CLOUD_FUNCTIONS_FILE_PATH,
  NODE_MODULES_FILE_PATH,
};