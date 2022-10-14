import { all, call, takeLatest } from 'redux-saga/effects';
import { problemsTypes } from './types';
import {
  workerAddProblem,
  workerAddProcessing,
  workerAddVideos,
  workerDeleteProblem,
  workerEditProblems,
  workerEditProcessing,
  workerGetProblems,
  workerGetProcessing,
  workerGetSingleProblem,
  workerGetSingleProblemVideos,
} from './workers';

function* watchGetProblems() {
  yield takeLatest(problemsTypes.GET_PROBLEMS_ASYNC, workerGetProblems);
}

function* watchAddProblem() {
  yield takeLatest(problemsTypes.ADD_PROBLEMS_ASYNC, workerAddProblem);
}

function* watchGetSingleProblem() {
  yield takeLatest(
    problemsTypes.GET_SINGLE_PROBLEM_ASYNC,
    workerGetSingleProblem,
  );
}

function* watchAddVideos() {
  yield takeLatest(problemsTypes.ADD_VIDEOS_ASYNC, workerAddVideos);
}

function* watchGetSingleProblemVideos() {
  yield takeLatest(
    problemsTypes.GET_SINGLE_PROBLEM_VIDEOS_ASYNC,
    workerGetSingleProblemVideos,
  );
}

function* watchDeleteProblem() {
  yield takeLatest(
    problemsTypes.DELETE_SINGLE_PROBLEM_ASYNC,
    workerDeleteProblem,
  );
}
function* watchAddProcessing() {
  yield takeLatest(problemsTypes.ADD_PROCESSING_ASYNC, workerAddProcessing);
}

function* watchEditProcessing() {
  yield takeLatest(problemsTypes.EDIT_PROCESSING_ASYNC, workerEditProcessing);
}

function* watchGetProcessing() {
  yield takeLatest(problemsTypes.GET_PROCESSING_ASYNC, workerGetProcessing);
}

function* watchEditProblem() {
  yield takeLatest(problemsTypes.EDIT_PROBLEMS_ASYNC, workerEditProblems);
}

export function* watchProblems() {
  yield all([
    call(watchGetProblems),
    call(watchGetSingleProblem),
    call(watchAddProblem),
    call(watchAddVideos),
    call(watchGetSingleProblemVideos),
    call(watchDeleteProblem),
    call(watchAddProcessing),
    call(watchGetProcessing),
    call(watchEditProcessing),
    call(watchEditProblem),
  ]);
}
