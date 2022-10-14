import {
  addProblem,
  addProcessing,
  addVideosApi,
  deleteProblem,
  editProblem,
  editProcessing,
  getProblemsApi,
  getProcessing,
  getSingleProblemApi,
  getSingleProblemVideos,
} from '@api/Problems';
import { call, put, select } from 'redux-saga/effects';
import { problemsActions } from './actions';
import { getProblems } from './selector';

export function* workerGetProblems(action: any): any {
  yield put(problemsActions.getProblemsRequest());

  const { count, current, sortString } = action.payload;

  let problems = yield select(getProblems);

  yield put(
    problemsActions.setPageSuccess({
      ...problems.page,
      count: count ? count : problems.page.count,
      current: current !== undefined ? current : problems.page.current,
    }),
  );

  yield put(
    problemsActions.setFilterSuccess({
      ...problems.filter,
      sortString: sortString ? sortString : problems.filter.sortString,
    }),
  );

  problems = yield select(getProblems);

  const take = problems.page.count;
  const skip = problems.page.count * problems.page.current;

  const response = yield call(getProblemsApi, {
    skip,
    take,
  });

  if (response) {
    yield put(problemsActions.getProblemsSuccess(response.data.result));
    yield put(
      problemsActions.setPageSuccess({
        ...problems.page,
        total: response.data.total,
      }),
    );
  }

  yield put(problemsActions.getProblemsFailed(null));
}

export function* workerGetSingleProblemVideos(action: any): any {
  yield put(problemsActions.getSingleProblemVideosRequest());

  const response = yield call(getSingleProblemVideos, action.payload);

  if (response?.data) {
    yield put(problemsActions.getSingleProblemVideosSuccess(response?.data));
  } else yield put(problemsActions.getSingleProblemVideosFailed(null));
}

export function* workerGetSingleProblem(action: any): any {
  yield put(problemsActions.getSingleProblemRequest());

  const response = yield call(getSingleProblemApi, action.payload);

  if (response?.data) {
    yield put(problemsActions.getSingleProblemSuccess(response?.data));
  } else yield put(problemsActions.getProblemsFailed(null));
}

export function* workerGetProcessing(action: any): any {
  yield put(problemsActions.getProcessingRequest());

  const response = yield call(getProcessing, action.payload);

  if (response?.status === 204) {
    yield put(problemsActions.getProcessingSuccess(null));
  } else if (response?.data) {
    yield put(problemsActions.getProcessingSuccess(response?.data));
  } else yield put(problemsActions.getProblemsFailed(null));
}

export function* workerDeleteProblem(action: any) {
  yield put(problemsActions.deleteSingleProblemRequest());

  yield call(deleteProblem, action.payload);

  const { problems } = yield select(getProblems);

  const editerProblems = problems.filter(
    (problem: any) => problem.id !== action.payload,
  );

  yield put(problemsActions.deleteSingleProblemSuccess(editerProblems));
}

export function* workerAddProblem(action: any): any {
  yield put(problemsActions.addProblemRequest());

  const response = yield call(addProblem, action.payload);

  if (response?.data) {
    yield put(problemsActions.addProblemSuccess(response?.data));
  } else yield put(problemsActions.addProblemFailed(null));
}

export function* workerEditProblems(action: any): any {
  yield put(problemsActions.editProcessingRequest());

  const { problems } = yield select(getProblems);

  const response = yield call(editProblem, action.payload);

  if (response?.data) {
    const editedProblems = problems.map((problem: any) =>
      problem.id === response?.data.id ? response?.data : problem,
    );

    yield put(problemsActions.editProblemSuccess(editedProblems));
  } else yield put(problemsActions.editProblemFailed(null));
}

export function* workerAddProcessing(action: any): any {
  yield put(problemsActions.addProcessingRequest());

  const response = yield call(addProcessing, action.payload);

  if (response?.data) {
    yield put(problemsActions.addProcessingSuccess(response?.data));
  } else yield put(problemsActions.addProcessingFailed(null));
}

export function* workerEditProcessing(action: any): any {
  yield put(problemsActions.editProcessingRequest());

  const response = yield call(editProcessing, action.payload);

  if (response?.data) {
    yield put(problemsActions.editProcessingSuccess(response?.data));
  } else yield put(problemsActions.editProcessingFailed(null));
}

export function* workerAddVideos(action: any): any {
  yield put(problemsActions.addVideosRequest());

  const formData = new FormData();

  for (let key in action.payload) {
    if (key !== 'files') {
      formData.append(key, action.payload[key]);
    } else {
      for (let file of action.payload[key]) {
        formData.append(key, file);
      }
    }
  }
  let { videos } = yield select(getProblems);

  const response = yield call(addVideosApi, formData);

  if (response?.data) {
    if (videos?.length) {
      const newVideos = [...videos, ...response?.data];
      yield put(problemsActions.addVideosSuccess(newVideos));
    } else yield put(problemsActions.addVideosSuccess(response?.data));
  } else yield put(problemsActions.addVideosFailed(null));
}
