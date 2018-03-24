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

import {
  deleteProfileImageForUser,
  deleteUserFromFirestore,
  getDefaultBucketName,
} from '../utilities';

/**
 * Handles a Firebase Authentication user deletion event.
 * 
 * @async
 * @memberof UserDeletion
 * @private 
 */
async function handleDeleteEvent({ data: { uid: userID } }) {
  try {

    // Stores the name of the default bucket.
    const bucketName = getDefaultBucketName();

    // Stores the array of promises.
    const promises = [
      // Deletes the user's profile image.
      deleteProfileImageForUser({
        bucketName,
        userID,
      }),
      // Deletes the user from Firestore.
      deleteUserFromFirestore(userID),
    ];

    // Executes all deletions in parallel.
    await Promise.all(promises);

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
