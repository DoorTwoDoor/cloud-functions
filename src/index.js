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

import camelCase from 'camelcase';
import glob from 'glob';

/**
 * Gets the filenames found matching the pattern.
 * 
 * @memberof CloudFunctions
 * @private
 */
function getFilenames() {
  // Stores the pattern to be matched.
  const pattern = './**/*.function.js';
  
  // Stores the options for pattern matching behaviour.
  const options = {
    cwd: __dirname,
    ignore: './node_modules/**',
  };
  
  return glob.sync(pattern, options);
}

/**
 * Exports the function names corresponding to the filenames found matching
 * the pattern.
 * 
 * @memberof CloudFunctions
 * @private 
 */
function exportFunctionNames() {
  // Stores the filenames found matching the pattern.
  const filenames = getFilenames();

  for (const filename of filenames) {
    /*
     * Stores the function name corresponding to the filename found matching
     * the pattern.
     */
    const functionName = camelCase(filename.slice(0, -12).split('/').join('-'));

    if (!process.env.FUNCTION_NAME ||
        process.env.FUNCTION_NAME === functionName) {
      exports[functionName] = require(filename).default;
    }
  }
}

/*
 * Exports the function names corresponding to the filenames found matching
 * the pattern.
 */
exportFunctionNames();
