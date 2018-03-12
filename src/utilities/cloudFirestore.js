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
 * Cloud Firestore module.
 *
 * @module CloudFirestore
 */

import { FIREBASE_APP } from '../constants';

/**
 * Stores the Firestore client.
 * 
 * @constant
 * @memberof CloudFirestore
 * @private
 * @readonly
 */
const firestoreClient = FIREBASE_APP.firestore();

/**
 * Removes the document within the collection.
 * 
 * @memberof CloudFirestore
 * @public
 */
function remove({
  collectionPath,
  documentPath,
}) {
  return firestoreClient
    .collection(collectionPath)
    .doc(documentPath)
    .delete();
}

/**
 * Sets fields in the document within the collection.
 * 
 * @memberof CloudFirestore
 * @public
 */
function set({
  collectionPath,
  documentPath,
  value,
}) {
  // Stores the configuration options.
  const options = { merge: true };

  return firestoreClient
    .collection(collectionPath)
    .doc(documentPath)
    .set(value, options);
}

export {
  remove,
  set,
};
