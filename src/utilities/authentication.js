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
 * Authentication module.
 *
 * @module Authentication
 */

import { FIREBASE_APP } from '../constants';

/**
 * Stores the authentication client.
 * 
 * @constant
 * @memberof Authentication
 * @private
 * @readonly
 */
const authenticationClient = FIREBASE_APP.auth();

/**
 * Updates an existing user.
 * 
 * @memberof Authentication
 * @public
 */
function updateUser({
  userID,
  value,
}) {
  return authenticationClient.updateUser(userID, value);
}

export { updateUser };
