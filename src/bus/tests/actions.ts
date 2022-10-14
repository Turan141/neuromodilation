import { createAction } from '@reduxjs/toolkit';

import { testsTypes } from '@bus/tests/types';

export const testsActions = {
  // Sync
  getTestsRequest: createAction(testsTypes.GET_TESTS_REQUEST),
  getTestsSuccess: createAction(testsTypes.GET_TESTS_SUCCESS, (data) => ({
    payload: data,
  })),
  getTestsFailed: createAction(testsTypes.GET_TESTS_FAILED, (data) => ({
    payload: data,
  })),
  getTestsAsync: createAction(testsTypes.GET_TESTS_ASYNC, (data) => ({
    payload: data,
  })),

  editSingleTestRequest: createAction(testsTypes.EDIT_SINGLE_TEST_REQUEST),
  editSingleTestSuccess: createAction(
    testsTypes.EDIT_SINGLE_TEST_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  editSingleTestFailed: createAction(
    testsTypes.EDIT_SINGLE_TEST_FAILED,
    (data) => ({
      payload: data,
    }),
  ),
  editSingleTestAsync: createAction(
    testsTypes.EDIT_SINGLE_TEST_ASYNC,
    (data) => ({ payload: data }),
  ),

  deleteSingleTestRequest: createAction(testsTypes.DELETE_SINGLE_TEST_REQUEST),
  deleteSingleTestSuccess: createAction(
    testsTypes.DELETE_SINGLE_TEST_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  deleteSingleTestFailed: createAction(
    testsTypes.DELETE_SINGLE_TEST_FAILED,
    (data) => ({
      payload: data,
    }),
  ),
  deleteSingleTestAsync: createAction(
    testsTypes.DELETE_SINGLE_TEST_ASYNC,
    (data) => ({ payload: data }),
  ),

  getSingleTestRequest: createAction(
    testsTypes.GET_SINGLE_TEST_REQUEST,
    (data?) => ({ payload: data }),
  ),
  getSingleTestSuccess: createAction(
    testsTypes.GET_SINGLE_TEST_SUCCESS,
    (data) => ({ payload: data }),
  ),
  getSingleTestFailed: createAction(
    testsTypes.GET_SINGLE_TEST_FAILED,
    (data) => ({ payload: data }),
  ),
  getSingleTestAsync: createAction(
    testsTypes.GET_SINGLE_TEST_ASYNC,
    (data) => ({ payload: data }),
  ),

  addFileRequest: createAction(testsTypes.ADD_FILE_REQUEST, (data?) => ({
    payload: data,
  })),
  addFileSuccess: createAction(testsTypes.ADD_FILE_SUCCESS, (data) => ({
    payload: data,
  })),
  addFileFailed: createAction(testsTypes.ADD_FILE_FAILED, (data) => ({
    payload: data,
  })),
  addFileAsync: createAction(testsTypes.ADD_FILE_ASYNC, (data) => ({
    payload: data,
  })),

  deleteFileRequest: createAction(testsTypes.DELETE_FILE_REQUEST, (data?) => ({
    payload: data,
  })),
  deleteFileSuccess: createAction(testsTypes.DELETE_FILE_SUCCESS, (data) => ({
    payload: data,
  })),
  deleteFileFailed: createAction(testsTypes.DELETE_FILE_FAILED, (data) => ({
    payload: data,
  })),
  deleteFileAsync: createAction(testsTypes.DELETE_FILE_ASYNC, (data) => ({
    payload: data,
  })),

  deleteQuestionRequest: createAction(
    testsTypes.DELETE_QUESTION_REQUEST,
    (data?) => ({
      payload: data,
    }),
  ),
  deleteQuestionSuccess: createAction(
    testsTypes.DELETE_QUESTION_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  deleteQuestionFailed: createAction(
    testsTypes.DELETE_QUESTION_FAILED,
    (data) => ({
      payload: data,
    }),
  ),
  deleteQuestionAsync: createAction(
    testsTypes.DELETE_QUESTION_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  createTestRequest: createAction(testsTypes.CREATE_TEST_REQUEST, (data?) => ({
    payload: data,
  })),
  createTestSuccess: createAction(testsTypes.CREATE_TEST_SUCCESS, (data) => ({
    payload: data,
  })),
  createTestFailed: createAction(testsTypes.CREATE_TEST_FAILED, (data) => ({
    payload: data,
  })),
  createTestAsync: createAction(testsTypes.CREATE_TEST_ASYNC, (data) => ({
    payload: data,
  })),

  addQuestionRequest: createAction(
    testsTypes.ADD_QUESTION_REQUEST,
    (data?) => ({
      payload: data,
    }),
  ),
  addQuestionSuccess: createAction(testsTypes.ADD_QUESTION_SUCCESS, (data) => ({
    payload: data,
  })),
  addQuestionFailed: createAction(testsTypes.ADD_QUESTION_FAILED, (data) => ({
    payload: data,
  })),
  addQuestionAsync: createAction(testsTypes.ADD_QUESTION_ASYNC, (data) => ({
    payload: data,
  })),

  setSubtestsSuccess: createAction(testsTypes.SET_SUBTESTS_SUCCESS, (data) => ({
    payload: data,
  })),

  editQuestionRequest: createAction(testsTypes.EDIT_QUESTION_REQUEST),
  editQuestionSuccess: createAction(
    testsTypes.EDIT_QUESTION_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  editQuestionFailed: createAction(testsTypes.EDIT_QUESTION_FAILED, (data) => ({
    payload: data,
  })),
  editQuestionAsync: createAction(testsTypes.EDIT_QUESTION_ASYNC, (data) => ({
    payload: data,
  })),

  getQuestionRequest: createAction(testsTypes.GET_QUESTION_REQUEST),
  getQuestionSuccess: createAction(testsTypes.GET_QUESTION_SUCCESS, (data) => ({
    payload: data,
  })),
  getQuestionFailed: createAction(testsTypes.GET_QUESTION_FAILED, (data) => ({
    payload: data,
  })),
  getQuestionAsync: createAction(testsTypes.GET_QUESTION_ASYNC, (data) => ({
    payload: data,
  })),

  getResultsRequest: createAction(testsTypes.GET_RESULTS_REQUEST),
  getResultsSuccess: createAction(testsTypes.GET_RESULTS_SUCCESS, (data) => ({
    payload: data,
  })),
  getResultsFailed: createAction(testsTypes.GET_RESULTS_FAILED, (data) => ({
    payload: data,
  })),
  getResultsAsync: createAction(testsTypes.GET_RESULTS_ASYNC, (data) => ({
    payload: data,
  })),

  setResultsRequest: createAction(testsTypes.SET_RESULTS_REQUEST),
  setResultsSuccess: createAction(testsTypes.SET_RESULTS_SUCCESS, (data) => ({
    payload: data,
  })),
  setResultsFailed: createAction(testsTypes.SET_RESULTS_FAILED, (data) => ({
    payload: data,
  })),
  setResultsAsync: createAction(testsTypes.SET_RESULTS_ASYNC, (data) => ({
    payload: data,
  })),

  getQuestionsRequest: createAction(testsTypes.GET_QUESTIONS_REQUEST),
  getQuestionsSuccess: createAction(
    testsTypes.GET_QUESTIONS_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  getQuestionsFailed: createAction(testsTypes.GET_QUESTIONS_FAILED, (data) => ({
    payload: data,
  })),
  getQuestionsAsync: createAction(testsTypes.GET_QUESTIONS_ASYNC, (data) => ({
    payload: data,
  })),

  getQuestionGroupsRequest: createAction(testsTypes.GET_QUESTION_GROUP_REQUEST),
  getQuestionGroupsSuccess: createAction(
    testsTypes.GET_QUESTION_GROUP_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  getQuestionGroupsFailed: createAction(
    testsTypes.GET_QUESTION_GROUP_FAILED,
    (data) => ({
      payload: data,
    }),
  ),
  getQuestionGroupsAsync: createAction(
    testsTypes.GET_QUESTION_GROUP_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  setPageSuccess: createAction(testsTypes.SET_PAGE_SUCCESS, (data) => ({
    payload: data,
  })),
  setPageAsync: createAction(testsTypes.SET_FILTER_SUCCESS, (data) => ({
    payload: data,
  })),

  setFilterSuccess: createAction(testsTypes.SET_FILTER_SUCCESS, (data) => ({
    payload: data,
  })),
  setFilterAsync: createAction(testsTypes.SET_FILTER_ASYNC, (data) => ({
    payload: data,
  })),
};
