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
  getISOStringFromUTCTime,
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
  profileImageURL,
  userID,
}) {
  // Destructures the users property from the collection paths.
  const { USERS } = COLLECTION_PATHS;

  // Stores the creation time ISO string converted from the creation time.
  const createdAt = getISOStringFromUTCTime(creationTime);

  // Stores the names that split from the display name.
  const names = displayName? splitDisplayName(displayName): {};

  // Destructures the first and last name properties from the names.
  const {
    firstName,
    lastName,
  } = names;
  
  // Sets the fields for the user in Firestore.
  return set({
    collectionPath: USERS,
    documentPath: userID,
    value: {
      createdAt,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      movesCount: 0,
      ...(profileImageURL && { profileImageURL }),
      rating: 5,
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
 * Splits the display name into first and last names.
 * 
 * @memberof Authentication
 * @private
 */
function splitDisplayName(displayName) {
  const [
    firstName,
    lastName,
  ] = displayName.split(' ');

  return {
    firstName,
    lastName,
  };
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
