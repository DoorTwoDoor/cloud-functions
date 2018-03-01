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
 * Cloud functions module.
 *
 * @module CloudFunctions
 */

import {
  CLOUD_FUNCTIONS_FILE_PATH,
  NODE_MODULES_FILE_PATH,
} from './constants';
import {
  getFunctionNameFromFilePath,
  getMatchingFilePaths,
} from './utilities';

/**
 * Exports the function names corresponding to the filenames found matching
 * the pattern.
 * 
 * @memberof CloudFunctions
 * @private 
 */
function exportFunctionNames() {
  // Stores the filenames found matching the pattern.
  const filePaths = getMatchingFilePaths({
    cwd: __dirname,
    ignore: NODE_MODULES_FILE_PATH,
    pattern: CLOUD_FUNCTIONS_FILE_PATH,
  });

  for (const filePath of filePaths) {
    /*
     * Stores the function name corresponding to the file path found matching
     * the pattern.
     */
    const functionName = getFunctionNameFromFilePath(filePath);

    if (!process.env.FUNCTION_NAME ||
        process.env.FUNCTION_NAME === functionName) {
      exports[functionName] = require(filePath).default;
    }
  }
}

/*
 * Exports the function names corresponding to the filenames found matching
 * the pattern.
 */
exportFunctionNames();
