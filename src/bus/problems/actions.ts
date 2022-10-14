import { problemsTypes } from './types';
import { createAction } from '@reduxjs/toolkit';

export const problemsActions = {
  getProblemsRequest: createAction(problemsTypes.GET_PROBLEMS_REQUEST),
  getProblemsSuccess: createAction(
    problemsTypes.GET_PROBLEMS_SUCCESS,
    (data) => ({ payload: data }),
  ),
  getProblemsFailed: createAction(
    problemsTypes.GET_PROBLEMS_FAILED,
    (data) => ({ payload: data }),
  ),

  getProblemsAsync: createAction(problemsTypes.GET_PROBLEMS_ASYNC, (data) => ({
    payload: data,
  })),

  getSingleProblemRequest: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_REQUEST,
  ),
  getSingleProblemSuccess: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_SUCCESS,
    (data) => ({ payload: data }),
  ),
  getSingleProblemFailed: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_FAILED,
    (data) => ({ payload: data }),
  ),

  getSingleProblemAsync: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  deleteSingleProblemRequest: createAction(
    problemsTypes.DELETE_SINGLE_PROBLEM_REQUEST,
  ),
  deleteSingleProblemSuccess: createAction(
    problemsTypes.DELETE_SINGLE_PROBLEM_SUCCESS,
    (data) => ({ payload: data }),
  ),
  deleteSingleProblemFailed: createAction(
    problemsTypes.DELETE_SINGLE_PROBLEM_FAILED,
    (data) => ({ payload: data }),
  ),

  deletetSingleProblemAsync: createAction(
    problemsTypes.DELETE_SINGLE_PROBLEM_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  getSingleProblemVideosRequest: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_VIDEOS_REQUEST,
  ),
  getSingleProblemVideosSuccess: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_VIDEOS_SUCCESS,
    (data) => ({ payload: data }),
  ),
  getSingleProblemVideosFailed: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_VIDEOS_FAILED,
    (data) => ({ payload: data }),
  ),

  getSingleProblemVideosAsync: createAction(
    problemsTypes.GET_SINGLE_PROBLEM_VIDEOS_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  getProcessingRequest: createAction(problemsTypes.GET_PROCESSING_REQUEST),
  getProcessingSuccess: createAction(
    problemsTypes.GET_PROCESSING_SUCCESS,
    (data) => ({ payload: data }),
  ),
  getProcessingFailed: createAction(
    problemsTypes.GET_PROCESSING_FAILED,
    (data) => ({ payload: data }),
  ),

  getProcessingAsync: createAction(
    problemsTypes.GET_PROCESSING_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  addProblemRequest: createAction(problemsTypes.ADD_PROBLEMS_REQUEST),
  addProblemSuccess: createAction(
    problemsTypes.ADD_PROBLEMS_SUCCESS,
    (data) => ({ payload: data }),
  ),
  addProblemFailed: createAction(problemsTypes.ADD_PROBLEMS_FAILED, (data) => ({
    payload: data,
  })),

  addProblemAsync: createAction(problemsTypes.ADD_PROBLEMS_ASYNC, (data) => ({
    payload: data,
  })),

  editProblemRequest: createAction(problemsTypes.EDIT_PROBLEMS_REQUEST),
  editProblemSuccess: createAction(
    problemsTypes.EDIT_PROBLEMS_SUCCESS,
    (data) => ({ payload: data }),
  ),
  editProblemFailed: createAction(
    problemsTypes.EDIT_PROBLEMS_FAILED,
    (data) => ({
      payload: data,
    }),
  ),

  editProblemAsync: createAction(problemsTypes.EDIT_PROBLEMS_ASYNC, (data) => ({
    payload: data,
  })),

  addVideosRequest: createAction(problemsTypes.ADD_VIDEOS_REQUEST),
  addVideosSuccess: createAction(problemsTypes.ADD_VIDEOS_SUCCESS, (data) => ({
    payload: data,
  })),
  addVideosFailed: createAction(problemsTypes.ADD_VIDEOS_FAILED, (data) => ({
    payload: data,
  })),

  addVideosAsync: createAction(problemsTypes.ADD_VIDEOS_ASYNC, (data) => ({
    payload: data,
  })),

  addProcessingRequest: createAction(problemsTypes.ADD_PROCESSING_REQUEST),
  addProcessingSuccess: createAction(
    problemsTypes.ADD_PROCESSING_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  addProcessingFailed: createAction(
    problemsTypes.ADD_PROCESSING_FAILED,
    (data) => ({
      payload: data,
    }),
  ),

  addProcessingAsync: createAction(
    problemsTypes.ADD_PROCESSING_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  editProcessingRequest: createAction(problemsTypes.EDIT_PROCESSING_REQUEST),
  editProcessingSuccess: createAction(
    problemsTypes.EDIT_PROCESSING_SUCCESS,
    (data) => ({
      payload: data,
    }),
  ),
  editProcessingFailed: createAction(
    problemsTypes.EDIT_PROCESSING_FAILED,
    (data) => ({
      payload: data,
    }),
  ),

  editProcessingAsync: createAction(
    problemsTypes.EDIT_PROCESSING_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  setPageSuccess: createAction(problemsTypes.SET_PAGE_SUCCESS, (data) => ({
    payload: data,
  })),
  setFilterSuccess: createAction(problemsTypes.SET_FILTER_SUCCESS, (data) => ({
    payload: data,
  })),

  setPageAsync: createAction(problemsTypes.SET_FILTER_SUCCESS, (data) => ({
    payload: data,
  })),
  setFilterAsync: createAction(problemsTypes.SET_FILTER_ASYNC, (data) => ({
    payload: data,
  })),
};
