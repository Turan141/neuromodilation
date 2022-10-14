import { createReducer } from '@reduxjs/toolkit';
import { problemsActions } from './actions';

interface InitialState {
  singleProblem: any;
  problems: any;
  processing: any;
  videos: any;
  page: {
    total: number;
    current: number;
    count: number;
  };
  filter: {
    sortString: string | null;
  };
  isLoadingProblems: boolean;
  isLoadingSingleProblem: boolean;
  isLoadingSingleProblemVideos: boolean;
  isLoadingProcessing: boolean;
  isLoadingCreateProblem: boolean;
  error: string | null;
}

const initialState: InitialState = {
  singleProblem: null,
  problems: [],
  videos: [],
  processing: null,
  page: {
    total: 0,
    current: 0,
    count: 10,
  },
  filter: {
    sortString: 'id',
  },
  isLoadingProblems: false,
  isLoadingSingleProblem: false,
  isLoadingProcessing: false,
  isLoadingCreateProblem: false,
  isLoadingSingleProblemVideos: false,
  error: null,
};

export const problemsReducer = createReducer(initialState, (builder) => {
  builder.addCase(problemsActions.setPageSuccess, (state, action) => ({
    ...state,
    page: action.payload,
  }));

  builder.addCase(problemsActions.setFilterSuccess, (state, action) => ({
    ...state,
    filter: action.payload,
  }));

  builder.addCase(problemsActions.getProblemsRequest, (state) => ({
    ...state,
    isLoadingProblems: true,
    error: null,
  }));

  builder.addCase(problemsActions.getProblemsSuccess, (state, action) => ({
    ...state,
    problems: action.payload,
    isLoadingProblems: false,
  }));

  builder.addCase(problemsActions.getProblemsFailed, (state, action) => ({
    ...state,
    error: action.payload,
  }));

  builder.addCase(problemsActions.deleteSingleProblemRequest, (state) => ({
    ...state,
    isLoadingProblems: true,
    error: null,
  }));

  builder.addCase(
    problemsActions.deleteSingleProblemSuccess,
    (state, action) => ({
      ...state,
      problems: action.payload,
      isLoadingProblems: false,
    }),
  );

  builder.addCase(
    problemsActions.deleteSingleProblemFailed,
    (state, action) => ({
      ...state,
      error: action.payload,
    }),
  );

  builder.addCase(problemsActions.getSingleProblemVideosRequest, (state) => ({
    ...state,
    isLoadingSingleProblemVideos: true,
    error: null,
  }));

  builder.addCase(
    problemsActions.getSingleProblemVideosSuccess,
    (state, action) => ({
      ...state,
      videos: action.payload,
      isLoadingSingleProblemVideos: false,
    }),
  );

  builder.addCase(
    problemsActions.getSingleProblemVideosFailed,
    (state, action) => ({
      ...state,
      error: action.payload,
    }),
  );

  builder.addCase(problemsActions.getProcessingRequest, (state) => ({
    ...state,
    isLoadingProcessing: true,
    error: null,
  }));

  builder.addCase(problemsActions.getProcessingSuccess, (state, action) => ({
    ...state,
    processing: action.payload,
    isLoadingProcessing: false,
  }));

  builder.addCase(problemsActions.getProcessingFailed, (state, action) => ({
    ...state,
    error: action.payload,
  }));

  builder.addCase(problemsActions.addVideosRequest, (state) => ({
    ...state,
    isLoadingSingleProblemVideos: true,
    error: null,
  }));

  builder.addCase(problemsActions.addVideosSuccess, (state, action) => ({
    ...state,
    videos: action.payload,
    isLoadingSingleProblemVideos: false,
  }));

  builder.addCase(problemsActions.addVideosFailed, (state, action) => ({
    ...state,
    error: action.payload,
  }));

  builder.addCase(problemsActions.addProcessingRequest, (state) => ({
    ...state,
    isLoadingProcessing: true,
    error: null,
  }));

  builder.addCase(problemsActions.addProcessingSuccess, (state, action) => ({
    ...state,
    processing: action.payload,
    isLoadingProcessing: false,
  }));

  builder.addCase(problemsActions.addProcessingFailed, (state, action) => ({
    ...state,
    error: action.payload,
    isLoadingProcessing: false,
  }));

  builder.addCase(problemsActions.editProcessingRequest, (state) => ({
    ...state,
    isLoadingProcessing: true,
    error: null,
  }));

  builder.addCase(problemsActions.editProcessingSuccess, (state, action) => ({
    ...state,
    processing: action.payload,
    isLoadingProcessing: false,
  }));

  builder.addCase(problemsActions.editProcessingFailed, (state, action) => ({
    ...state,
    error: action.payload,
    isLoadingProcessing: false,
  }));

  builder.addCase(problemsActions.getSingleProblemRequest, (state) => ({
    ...state,
    isLoadingSingleProblem: true,
    error: null,
  }));

  builder.addCase(problemsActions.getSingleProblemSuccess, (state, action) => ({
    ...state,
    singleProblem: action.payload,
    isLoadingSingleProblem: false,
  }));

  builder.addCase(problemsActions.getSingleProblemFailed, (state, action) => ({
    ...state,
    error: action.payload,
  }));

  builder.addCase(problemsActions.addProblemRequest, (state) => ({
    ...state,
    isLoadingCreateProblem: true,
    error: null,
  }));

  builder.addCase(problemsActions.addProblemSuccess, (state, action) => ({
    ...state,
    problems: [action.payload, ...state.problems],
    singleProblem: action.payload,
    isLoadingCreateProblem: false,
  }));

  builder.addCase(problemsActions.addProblemFailed, (state, action) => ({
    ...state,
    error: action.payload,
  }));

  builder.addCase(problemsActions.editProblemRequest, (state) => ({
    ...state,
    isLoadingCreateProblem: true,
    error: null,
  }));

  builder.addCase(problemsActions.editProblemSuccess, (state, action) => ({
    ...state,
    problems: action.payload,
    singleProblem: action.payload,
    isLoadingCreateProblem: false,
  }));

  builder.addCase(problemsActions.editProblemFailed, (state, action) => ({
    ...state,
    error: action.payload,
  }));
});
