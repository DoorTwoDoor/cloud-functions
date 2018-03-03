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
 * Google Cloud Vision data types module.
 *
 * @module GoogleCloudVisionDataTypes
 */

/**
 * Stores the likelihoods.
 *
 * @constant
 * @default
 * @memberof GoogleCloudVisionDataTypes
 * @public
 * @readonly
 */
const LIKELIHOODS = {
  UNKNOWN: 0,
  VERY_UNLIKELY: 1,
  UNLIKELY: 2,
  POSSIBLE: 3,
  LIKELY: 4,
  VERY_LIKELY: 5,
};

export { LIKELIHOODS };
