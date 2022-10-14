import { all, call } from 'redux-saga/effects';

import { watchAuth } from '@bus/authentication/watchers';
import { watchLegalEntities } from '@bus/legalEntities/watchers';
import { watchTests } from '@bus/tests/watchers';
import { watchProblems } from '@bus/problems/watchers';

export function* rootSaga() {
  yield all([
    call(watchAuth),
    call(watchLegalEntities),
    call(watchTests),
    call(watchProblems),
  ]);
}
