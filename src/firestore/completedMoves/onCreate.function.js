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
 * Moves count update module.
 *
 * @module MovesCountUpdate
 */

import * as firebaseFunctions from 'firebase-functions';

import {
  getDocumentReference,
  runTransaction,
} from '../../utilities';

/**
 * Handles a transaction to update the moves count for a mover.
 * 
 * @async
 * @memberof MovesCountUpdate
 * @private
 */
/* eslint-disable consistent-return */
async function handleTransaction({
  data,
  transaction,
}) {
  try {
    
    // Destructures the mover property from the data.
    const { mover } = data.data();

    // Stores the document reference.
    const documentReference = getDocumentReference({
      collectionPath: 'users',
      documentPath: mover,
    });

    // Stores the document snapshot.
    const documentSnapshot = await transaction.get(documentReference);

    // Destructures the moves count property from the data.
    const { movesCount } = documentSnapshot.data();

    // Increment the number of moves.
    const newMovesCount = movesCount + 1;

    return transaction.set(
      documentReference,
      { movesCount: newMovesCount },
      { merge: true },
    );

  } catch (error) {
    
    console.error(error);

  }
}
/* eslint-enable consistent-return */

/**
 * Handles a Cloud Firestore completed move creation event.
 * 
 * @async
 * @memberof MovesCountUpdate
 * @private
 */
async function handleCreateEvent({ data }) {
  try {
    
    // Executes the transaction to update the moves count for a mover.
    await runTransaction(transaction => handleTransaction({
      data,
      transaction,
    }));

    return;

  } catch (error) {
    
    console.error(error);
    
  }
}

/**
 * Stores the cloud function, which fires every time a new completed move is
 * created in Cloud Firestore.
 * 
 * @constant
 * @memberof MovesCountUpdate
 * @public
 * @readonly
 */
const updateMovesCount = firebaseFunctions
  .firestore
  .document('completedMoves/{moveID}')
  .onCreate(event => handleCreateEvent(event));

export default updateMovesCount;
