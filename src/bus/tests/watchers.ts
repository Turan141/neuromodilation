import { all, takeLatest, call, takeEvery } from 'redux-saga/effects';

import { testsTypes } from '@bus/tests/types';
import {
  workerGetTests,
  workerGetSingleTest,
  workerCreateTest,
  workerAddQuestion,
  workerEditSingleTest,
  workerGetQuestions,
  workerGetQuestion,
  workerEditQuestion,
  workerGetQuestionGroups,
  workerAddFile,
  workerDeleteTest,
  workerDeleteFile,
  workerDeleteQuestion,
  workerGetResults,
  workerSetResults,
} from '@bus/tests/workers';

function* watchGetTests() {
  yield takeLatest(testsTypes.GET_TESTS_ASYNC, workerGetTests);
}

function* watchCreateTest() {
  yield takeLatest(testsTypes.CREATE_TEST_ASYNC, workerCreateTest);
}

function* watchGetSingleTest() {
  yield takeEvery(testsTypes.GET_SINGLE_TEST_ASYNC, workerGetSingleTest);
}

function* watchEditSingleTest() {
  yield takeEvery(testsTypes.EDIT_SINGLE_TEST_ASYNC, workerEditSingleTest);
}

function* watchGetQuestions() {
  yield takeEvery(testsTypes.GET_QUESTIONS_ASYNC, workerGetQuestions);
}

function* watchGetQuestion() {
  yield takeEvery(testsTypes.GET_QUESTION_ASYNC, workerGetQuestion);
}

function* watchAddQuestion() {
  yield takeEvery(testsTypes.ADD_QUESTION_ASYNC, workerAddQuestion);
}

function* watchEditQuestion() {
  yield takeEvery(testsTypes.EDIT_QUESTION_ASYNC, workerEditQuestion);
}

function* watchGetQuestionGroups() {
  yield takeEvery(testsTypes.GET_QUESTION_GROUP_ASYNC, workerGetQuestionGroups);
}

function* watchAddFile() {
  yield takeEvery(testsTypes.ADD_FILE_ASYNC, workerAddFile);
}

function* watchaDeleteFile() {
  yield takeEvery(testsTypes.DELETE_FILE_ASYNC, workerDeleteFile);
}

function* watchDeleteQuestion() {
  yield takeEvery(testsTypes.DELETE_QUESTION_ASYNC, workerDeleteQuestion);
}

function* watchDeleteTest() {
  yield takeEvery(testsTypes.DELETE_SINGLE_TEST_ASYNC, workerDeleteTest);
}

function* watchGetResults() {
  yield takeEvery(testsTypes.GET_RESULTS_ASYNC, workerGetResults);
}
function* watchSetResults() {
  yield takeEvery(testsTypes.SET_RESULTS_ASYNC, workerSetResults);
}

export function* watchTests() {
  yield all([
    call(watchGetTests),
    call(watchGetSingleTest),
    call(watchEditSingleTest),
    call(watchCreateTest),
    call(watchAddQuestion),
    call(watchGetQuestions),
    call(watchGetQuestion),
    call(watchEditQuestion),
    call(watchGetQuestionGroups),
    call(watchAddFile),
    call(watchDeleteTest),
    call(watchaDeleteFile),
    call(watchDeleteQuestion),
    call(watchGetResults),
    call(watchSetResults),
  ]);
}
