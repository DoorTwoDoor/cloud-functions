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

import {
  COLLECTION_PATHS,
  FIREBASE_APP,
} from '../constants';
import {
  getTimestampFromUTCTime,
  remove,
  set,
} from '.';

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
 * Creates a user in Firestore.
 * 
 * @memberof Authentication
 * @public
 */
function createUserInFirestore({
  creationTime,
  displayName,
  photoURL,
  userID,
}) {
  // Destructures the users property from the collection paths.
  const { USERS } = COLLECTION_PATHS;

  // Stores the creation timestamp converted from the creation time.
  const creationTimestamp = getTimestampFromUTCTime({ time: creationTime });
  
  // Sets the fields for the user in Firestore.
  return set({
    collectionPath: USERS,
    documentPath: userID,
    value: {
      creationTime: creationTimestamp,
      ...(displayName && { displayName }),
      moves: 0,
      ...(photoURL && { photoURL }),
      rating: 0,
    },
  });
}

/**
 * Deletes a user from Firestore.
 * 
 * @memberof Authentication
 * @public
 */
function deleteUserFromFirestore(userID) {
  // Destructures the users property from the collection paths.
  const { USERS } = COLLECTION_PATHS;
  
  return remove({
    collectionPath: USERS,
    documentPath: userID,
  });
}

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

export {
  createUserInFirestore,
  deleteUserFromFirestore,
  updateUser,
};
