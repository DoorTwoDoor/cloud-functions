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
 * Firebase Admin module.
 *
 * @module FirebaseAdmin
 */

import * as firebaseAdmin from 'firebase-admin';
import * as firebaseFunctions from 'firebase-functions';

/**
 * Creates and initializes a Firebase app instance.
 * 
 * @memberof FirebaseAdmin
 * @private
 */
function initializeApp() {
  // Stores the configuration options.
  const options = firebaseFunctions.config().firebase;

  return firebaseAdmin.initializeApp(options);
}

/**
 * Stores the Firebase app instance.
 * 
 * @constant
 * @memberof FirebaseAdmin
 * @public
 * @readonly
 */
const FIREBASE_APP = initializeApp();

export { FIREBASE_APP };
