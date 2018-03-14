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
  updateProfileImageURLForUser,
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

    // Creates the user in Firestore.
    await createUserInFirestore({
      creationTime,
      displayName,
      profileImageURL,
      userID,
    });
    
    if (profileImageURL) { // User has a profile image already?
      return;
    }
  
    // Stores the name of the default bucket.
    const bucketName = getDefaultBucketName();

    // Updates the profile image URL for the user.
    await updateProfileImageURLForUser({
      bucketName,
      filePath: DEFAULT_PROFILE_IMAGE_FILE_PATH,
      userID,
    });

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
