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
 * Date time module.
 *
 * @module DateTime
 */

import { ISO_8601_FORMAT } from '../constants';
import moment from 'moment';

/**
 * Gets the ISO string representation from the UTC time representation.
 * 
 * @memberof DateTime
 * @public
 */
function getISOStringFromUTCTime(time) {
  const date = new Date(time);
  
  return moment
    .utc(date)
    .format(ISO_8601_FORMAT);
}

export { getISOStringFromUTCTime };
