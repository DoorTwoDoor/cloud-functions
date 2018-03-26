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
 * Get a document reference instance that refers to the document within the
 * collection.
 * 
 * @memberof CloudFirestore
 * @public
 */
function getDocumentReference({
  collectionPath,
  documentPath,
}) {
  return firestoreClient
    .collection(collectionPath)
    .doc(documentPath);
}

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
  // Stores the document reference.
  const documentReference = getDocumentReference({
    collectionPath,
    documentPath,
  });

  return documentReference.delete();
}

/**
 * Executes the given update function and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the update function. If it fails to
 * commit after 5 attempts, the transaction fails.
 * 
 * @memberof CloudFirestore
 * @public
 */
function runTransaction(updateFunction) {
  return firestoreClient
    .runTransaction(updateFunction);
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
  // Stores the document reference.
  const documentReference = getDocumentReference({
    collectionPath,
    documentPath,
  });
  
  return documentReference.set(
    value,
    { merge: true },
  );
}

export {
  getDocumentReference,
  remove,
  runTransaction,
  set,
};
