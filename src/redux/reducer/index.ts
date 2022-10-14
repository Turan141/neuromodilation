import { combineReducers } from 'redux';

import { authenticationReducer } from '@bus/authentication/reducer';
import { legalEntitiesReducer } from '@bus/legalEntities/reducer';
import { testsReducer } from '@bus/tests/reducer';
import { problemsReducer } from '@bus/problems/reducer';

export const rootReducer = () =>
  combineReducers({
    authentication: authenticationReducer,
    legalEntities: legalEntitiesReducer,
    tests: testsReducer,
    problems: problemsReducer,
  });
