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
 * User creation module.
 *
 * @module UserCreation
 */

import * as firebaseFunctions from 'firebase-functions';

import {
  createUserInFirestore,
  getDefaultBucketName,
  getDownloadURL,
  updateUser,
} from '../utilities';

import { DEFAULT_PROFILE_IMAGE_FILE_PATH } from '../constants';

/**
 * Handles a Firebase Authentication user creation event.
 * 
 * @async
 * @memberof UserCreation
 * @private
 */
async function handleCreateEvent({
  data: {
    displayName,
    metadata: {
      creationTime,
    },
    photoURL: profileImageURL,
    uid: userID,
  },
}) {
  try {

    // Stores the name of the default bucket.
    const bucketName = getDefaultBucketName();

    // Stores the default profile image URL.
    const defaultProfileImageURL = getDownloadURL({
      bucketName,
      filePath: DEFAULT_PROFILE_IMAGE_FILE_PATH,
    });

    // Stores the array of promises.
    let promises = [
      // Creates the user in Firestore.
      createUserInFirestore({
        creationTime,
        displayName,
        profileImageURL: profileImageURL || defaultProfileImageURL,
        userID,
      }),
    ];

    if (!profileImageURL) { // User has no profile image?
      promises = [
        ...promises,
        // Updates the profile image URL for the user in Authentication.
        updateUser({
          userID,
          value: { photoURL: defaultProfileImageURL },
        }),
      ];
    }

    // Executes user creation and profile image URL update in parallel.
    await Promise.all(promises);

    return;

  } catch (error) {
    
    console.error(error);

  }
}

/**
 * Stores the cloud function, which fires every time a Firebase Authentication
 * user is created.
 * 
 * @constant
 * @memberof UserCreation
 * @public
 * @readonly
 */
const createUser = firebaseFunctions
  .auth
  .user()
  .onCreate(event => handleCreateEvent(event));

export default createUser;
