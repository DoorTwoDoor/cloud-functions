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
 * User deletion module.
 *
 * @module UserDeletion
 */

import * as firebaseFunctions from 'firebase-functions';

import { deleteUserFromFirestore } from '../utilities';

/**
 * Handles a Firebase Authentication user deletion event.
 * 
 * @async
 * @memberof UserDeletion
 * @private 
 */
async function handleDeleteEvent({ data: { uid: userID } }) {
  try {

    // Deletes the user from Firestore.
    await deleteUserFromFirestore(userID);

    return;

  } catch (error) {
    
    console.error(error);
    
  }
}

/**
 * Stores the cloud function, which fires every time a Firebase Authentication
 * user is deleted.
 * 
 * @constant
 * @memberof UserDeletion
 * @public
 * @readonly
 */
const deleteUser = firebaseFunctions
  .auth
  .user()
  .onDelete(event => handleDeleteEvent(event));

export default deleteUser;
