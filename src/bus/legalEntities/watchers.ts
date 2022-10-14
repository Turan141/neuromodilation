import { all, takeLatest, call, takeEvery } from 'redux-saga/effects';

import { legalEntitiesTypes } from '@bus/legalEntities/types';
import {
  workerGetLegalEntities,
  workerGetSingleLegalEntitie,
  workerCreateLegalEntitie,
  workerEditLegalEntitie,
  workerDeleteLegalEntitie,
} from '@bus/legalEntities/workers';

function* watchGetLegalEntities() {
  yield takeLatest(
    legalEntitiesTypes.GET_LEGAL_ENTITIES_ASYNC,
    workerGetLegalEntities,
  );
}

function* watchGetSingleLegalEntities() {
  yield takeEvery(
    legalEntitiesTypes.GET_LEGAL_ENTITIE_SINGLE_ASYNC,
    workerGetSingleLegalEntitie,
  );
}

function* watchCreateLegalEntitie() {
  yield takeEvery(
    legalEntitiesTypes.CREATE_LEGAL_ENTITIE_ASYNC,
    workerCreateLegalEntitie,
  );
}

function* watchEditLegalEntitie() {
  yield takeEvery(
    legalEntitiesTypes.EDIT_LEGAL_ENTITIE_ASYNC,
    workerEditLegalEntitie,
  );
}

function* watchDeleteLegalEntitie() {
  yield takeEvery(
    legalEntitiesTypes.DELETE_LEGAL_ENTITIE_ASYNC,
    workerDeleteLegalEntitie,
  );
}

export function* watchLegalEntities() {
  yield all([
    call(watchGetLegalEntities),
    call(watchGetSingleLegalEntities),
    call(watchCreateLegalEntitie),
    call(watchEditLegalEntitie),
    call(watchDeleteLegalEntitie),
  ]);
}
