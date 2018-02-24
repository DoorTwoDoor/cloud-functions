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
 * Streams module.
 *
 * @module Streams
 */

/**
 * Gets a promise from a writable stream.
 * 
 * @memberof Streams
 * @public
 */
function getPromiseFromWritableStream(writableStream) {
  return new Promise((resolve, reject) => (
    writableStream.on('finish', resolve).on('error', reject)
  ));
}

export { getPromiseFromWritableStream };
