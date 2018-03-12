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

import { UNITS } from '../constants';
import moment from 'moment';

/**
 * Converts the timestamp from one unit to another unit.
 * 
 * @memberof DateTime
 * @private
 */
function convertTimestampUnit({
  inputUnit = UNITS.MILLISECONDS,
  outputUnit = UNITS.SECONDS,
  timestamp,
}) {
  // Destructures the milliseconds and seconds property from units.
  const {
    MILLISECONDS,
    SECONDS,
  } = UNITS;

  if (
    (inputUnit === MILLISECONDS) &&
    (outputUnit === SECONDS)
  ) { // Is from milliseconds to seconds?
    
    return moment(timestamp).unix();
  
  } else if (
    (inputUnit === SECONDS) &&
    (outputUnit === MILLISECONDS)
  ) { // Is from seconds to milliseconds?
    
    return timestamp * 1000;
  
  } else {
    
    return timestamp;
  
  }
}

/**
 * Gets the UNIX timestamp from a UTC time in a particular unit.
 * 
 * @memberof DateTime
 * @public
 */
function getTimestampFromUTCTime({
  time,
  unit = UNITS.SECONDS,
}) {
  // Destructures the milliseconds property from units.
  const { MILLISECONDS } = UNITS;
  
  // Stores the UNIX timestamp that is converted from a UTC time.
  const timestamp = Date.parse(time);

  switch (unit) {
    case MILLISECONDS:
      return timestamp;
  
    default:
      return convertTimestampUnit({ timestamp });
  }
}

export { getTimestampFromUTCTime };
