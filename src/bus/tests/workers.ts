import { call, put, select } from 'redux-saga/effects';

import { testsActions } from '@bus/tests/actions';
import { getTests } from '@bus/tests/selector';

import {
  getTestsApi,
  getSingleTestApi,
  createTest,
  putSingleTestApi,
  getQuestionsApi,
  getQuestionApi,
  addQuestionApi,
  editQuestionApi,
  getQuestionGroupsApi,
  deleteTest,
  deleteQuestionApi,
  getResults,
  setResults,
} from '@api/Tests';
import { addFile, deleteFile } from '@api/Files';

export function* workerGetTests(action: any): any {
  yield put(testsActions.getTestsRequest());

  const { count, current, sortString } = action.payload;

  let tests = yield select(getTests);

  yield put(
    testsActions.setPageSuccess({
      ...tests.page,
      count: count ? count : tests.page.count,
      current: current !== undefined ? current : tests.page.current,
    }),
  );

  yield put(
    testsActions.setFilterSuccess({
      ...tests.filter,
      sortString: sortString ? sortString : tests.filter.sortString,
    }),
  );

  tests = yield select(getTests);

  const take = tests.page.count;
  const skip = tests.page.count * tests.page.current;

  const response = yield call(getTestsApi, {
    take,
    skip,
    sortString: tests.filter.sortString,
  });

  if (response) {
    yield put(testsActions.getTestsSuccess(response.data.result));
    yield put(
      testsActions.setPageSuccess({
        ...tests.page,
        total: response.data.total,
      }),
    );
  } else yield put(testsActions.getTestsFailed(null));
}

export function* workerGetSingleTest(action: any): any {
  yield put(testsActions.getSingleTestRequest());

  const { singleTest } = action.payload;

  const response = yield call(getSingleTestApi, { id: singleTest.id });

  if (response?.data) {
    yield put(testsActions.getSingleTestSuccess(response?.data));
    yield put(testsActions.setSubtestsSuccess(response?.data?.subtests));
  } else yield put(testsActions.getSingleTestFailed(null));
}

export function* workerEditSingleTest(action: any): any {
  yield put(testsActions.editSingleTestRequest());

  const response = yield call(putSingleTestApi, action.payload);

  if (response?.data) {
    const { tests } = yield select(getTests);
    let tmpTests = JSON.parse(JSON.stringify(tests));
    const index = tests.findIndex((item: any) => item.id === response?.data.id);
    tmpTests.splice(index, 1, response.data);

    yield put(testsActions.editSingleTestSuccess(response.data));
    yield put(testsActions.getTestsSuccess(tmpTests));
    yield put(testsActions.setSubtestsSuccess(response.data.subtests));
  } else yield put(testsActions.editSingleTestFailed(null));
}

export function* workerCreateTest(action: any): any {
  yield put(testsActions.createTestRequest());
  const test = action.payload;

  let { page } = yield select(getTests);

  const response = yield call(createTest, test);
  if (response?.data) {
    yield put(
      testsActions.setPageSuccess({
        ...page,
        total: page.total + 1,
      }),
    );
    yield put(testsActions.createTestSuccess(response.data));
    yield put(testsActions.getSingleTestSuccess(response.data));
    yield put(testsActions.setSubtestsSuccess(response.data.subtests));
  } else yield put(testsActions.createTestFailed(null));
}

export function* workerGetQuestions(action: any): any {
  yield put(testsActions.getQuestionsRequest());

  const response = yield call(getQuestionsApi, action.payload);

  if (response?.data) {
    yield put(testsActions.getQuestionsSuccess(response.data));
  } else yield put(testsActions.getQuestionsFailed(null));
}

export function* workerGetQuestion(action: any): any {
  yield put(testsActions.getQuestionRequest());

  const response = yield call(getQuestionApi, action.payload);

  if (response?.data) {
    yield put(testsActions.getQuestionSuccess(response.data));
  } else yield put(testsActions.getQuestionFailed(null));
}

export function* workerGetResults(action: any): any {
  yield put(testsActions.getResultsRequest());

  const response = yield call(getResults, action.payload);

  if (response?.data) {
    yield put(testsActions.getResultsSuccess(response.data));
  } else yield put(testsActions.getResultsFailed(null));
}

export function* workerSetResults(action: any): any {
  yield put(testsActions.setResultsRequest());

  const response = yield call(setResults, action.payload);

  if (response?.data) {
    yield put(testsActions.setResultsSuccess(response.data));
  } else yield put(testsActions.setResultsFailed(null));
}

export function* workerAddQuestion(action: any): any {
  yield put(testsActions.addQuestionRequest());

  const response = yield call(addQuestionApi, action.payload);

  if (response?.data) {
    const { questions } = yield select(getTests);
    yield put(testsActions.addQuestionSuccess([...questions, response.data]));
  } else yield put(testsActions.addQuestionFailed(null));
}

export function* workerEditQuestion(action: any): any {
  yield put(testsActions.editQuestionRequest());

  const response = yield call(editQuestionApi, action.payload);
  if (response?.data) {
    const { questions } = yield select(getTests);

    let tmpQuestions = JSON.parse(JSON.stringify(questions));
    const index = questions.findIndex(
      (item: any) => item.id === response.data.id,
    );
    tmpQuestions.splice(index, 1, response.data);

    yield put(testsActions.editQuestionSuccess(tmpQuestions));
  } else yield put(testsActions.editQuestionFailed(null));
}

export function* workerDeleteQuestion(action: any) {
  yield put(testsActions.deleteQuestionRequest());

  yield call(deleteQuestionApi, action.payload);

  const { questions } = yield select(getTests);

  const editedQuestions = questions.filter(
    (question: any) => question.id !== action.payload,
  );

  yield put(testsActions.deleteQuestionSuccess(editedQuestions));
}

export function* workerGetQuestionGroups() {
  yield put(testsActions.getQuestionGroupsRequest());
  const { data } = yield call(getQuestionGroupsApi);
  yield put(testsActions.getQuestionGroupsSuccess(data));
}

export function* workerAddFile(action: any) {
  yield put(testsActions.addFileRequest());

  const { question } = yield select(getTests);

  const formData = new FormData();
  formData.append('file', action.payload);
  const { data } = yield call(addFile, formData);
  const newQuestion = {
    ...question,
    fileMetadataId: data.id,
    fileURL: data.url,
  };

  yield put(testsActions.addFileSuccess(newQuestion));
}

export function* workerDeleteFile(action: any) {
  yield put(testsActions.deleteFileRequest());

  const { question } = yield select(getTests);

  yield call(deleteFile, action.payload);

  const newQuestion = { ...question, fileMetadataId: null, fileURL: null };

  yield put(testsActions.deleteFileSuccess(newQuestion));
}

export function* workerDeleteTest(action: any): any {
  yield put(testsActions.deleteSingleTestRequest());
  const { payload } = action;

  const { tests, page } = yield select(getTests);

  yield call(deleteTest, payload);

  yield put(
    testsActions.setPageSuccess({
      ...page,
      total: page.total - 1,
    }),
  );

  const editedTests = tests.filter((test: any) => test.id !== payload.id);

  yield put(testsActions.deleteSingleTestSuccess(editedTests));
}
