import { createReducer } from '@reduxjs/toolkit';

import { testsActions } from '@bus/tests/actions';
import { authenticationActions } from '@bus/authentication/actions';

interface singleTestType {
  id: number;
  name: string;
  description: string;
  subtests?: any;
  questions: any[];
}

interface questionType {
  subtestId?: number;
  id?: 0;
  text: string;
  fileMetadataId?: string;
  fileURL?: string;
  questionGroupId: number | string;
  variants: [
    {
      id?: number;
      text: string;
      score: number | string;
      fileMetadataId?: string;
    },
  ];
}

interface questionGroupType {
  id: number;
  name: string;
}

interface InitialState {
  singleTest: singleTestType | null;
  tests: singleTestType[];
  subtests: singleTestType[];
  questions: questionType[];
  results: any[];
  question: questionType | null;
  questionGroups: questionGroupType[];
  page: {
    total: number;
    current: number;
    count: number;
  };
  filter: {
    sortString: string | null;
  };
  isLoadingTests: boolean;
  isLoadingSingleTest: boolean;
  isLoadingCreateSingleTest: boolean;
  isLoadingEditSingleTest: boolean;
  isLoadingDeleteSingleTest: boolean;
  isLoadingCreateQuestion: boolean;
  isLoadingEditQuestion: boolean;
  isLoadingGetQuestions: boolean;
  isLoadingGetQuestion: boolean;
  isLoadingGetQuestionGroups: boolean;
  isLoadingGetResults: boolean;
  error: string | null;
}

const initialState: InitialState = {
  singleTest: null,
  tests: [],
  subtests: [],
  questions: [],
  results: [],
  question: null,
  questionGroups: [],
  page: {
    total: 0,
    current: 0,
    count: 10,
  },
  filter: {
    sortString: 'id',
  },
  isLoadingTests: false,
  isLoadingSingleTest: false,
  isLoadingCreateSingleTest: false,
  isLoadingEditSingleTest: false,
  isLoadingDeleteSingleTest: false,
  isLoadingCreateQuestion: false,
  isLoadingEditQuestion: false,
  isLoadingGetQuestions: false,
  isLoadingGetQuestion: false,
  isLoadingGetResults: false,
  isLoadingGetQuestionGroups: false,
  error: null,
};

export const testsReducer = createReducer(initialState, (builder) => {
  builder.addCase(testsActions.getSingleTestRequest, (state) => ({
    ...state,
    isLoadingSingleTest: true,
    error: null,
  }));
  builder.addCase(testsActions.getSingleTestSuccess, (state, action) => ({
    ...state,
    singleTest: action.payload,
    isLoadingSingleTest: false,
  }));
  builder.addCase(testsActions.getSingleTestFailed, (state, action) => ({
    ...state,
    isLoadingSingleTest: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.setSubtestsSuccess, (state, action) => ({
    ...state,
    subtests: action.payload,
  }));

  builder.addCase(testsActions.editSingleTestRequest, (state) => ({
    ...state,
    isLoadingEditSingleTest: true,
    error: null,
  }));
  builder.addCase(testsActions.editSingleTestSuccess, (state, action) => ({
    ...state,
    singleTest: action.payload,
    isLoadingEditSingleTest: false,
  }));
  builder.addCase(testsActions.editSingleTestFailed, (state, action) => ({
    ...state,
    error: action.payload,
    isLoadingEditSingleTest: false,
  }));

  builder.addCase(testsActions.deleteSingleTestRequest, (state, action) => ({
    ...state,
    isLoadingDeleteSingleTest: true,
    error: null,
  }));
  builder.addCase(testsActions.deleteSingleTestFailed, (state, action) => ({
    ...state,
    isLoadingDeleteSingleTest: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.deleteSingleTestSuccess, (state, action) => ({
    ...state,
    isLoadingDeleteSingleTest: false,
    tests: action.payload,
  }));

  builder.addCase(testsActions.createTestRequest, (state, action) => ({
    ...state,
    isLoadingCreateSingleTest: true,
    error: null,
  }));
  builder.addCase(testsActions.createTestSuccess, (state, action) => ({
    ...state,
    isLoadingCreateSingleTest: false,
    tests: [action.payload, ...state.tests],
  }));
  builder.addCase(testsActions.createTestFailed, (state, action) => ({
    ...state,
    isLoadingCreateSingleTest: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.addQuestionRequest, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: true,
    error: null,
  }));
  builder.addCase(testsActions.addQuestionSuccess, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    questions: action.payload,
  }));
  builder.addCase(testsActions.addQuestionFailed, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.addFileRequest, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: true,
    error: null,
  }));
  builder.addCase(testsActions.addFileSuccess, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    question: action.payload,
  }));
  builder.addCase(testsActions.addFileFailed, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.getResultsRequest, (state, action) => ({
    ...state,
    isLoadingGetResults: true,
    error: null,
  }));
  builder.addCase(testsActions.getResultsSuccess, (state, action) => ({
    ...state,
    isLoadingGetResults: false,
    results: action.payload,
  }));
  builder.addCase(testsActions.getResultsFailed, (state, action) => ({
    ...state,
    isLoadingGetResults: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.setResultsRequest, (state, action) => ({
    ...state,
    isLoadingGetResults: true,
    error: null,
  }));
  builder.addCase(testsActions.setResultsSuccess, (state, action) => ({
    ...state,
    isLoadingGetResults: false,
    results: action.payload,
  }));
  builder.addCase(testsActions.setResultsFailed, (state, action) => ({
    ...state,
    isLoadingGetResults: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.deleteFileRequest, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: true,
    error: null,
  }));
  builder.addCase(testsActions.deleteFileSuccess, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    question: action.payload,
  }));
  builder.addCase(testsActions.deleteFileFailed, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.deleteQuestionRequest, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: true,
    error: null,
  }));
  builder.addCase(testsActions.deleteQuestionSuccess, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    questions: action.payload,
  }));
  builder.addCase(testsActions.deleteQuestionFailed, (state, action) => ({
    ...state,
    isLoadingCreateQuestion: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.getTestsRequest, (state) => ({
    ...state,
    isLoadingTests: true,
    error: null,
  }));
  builder.addCase(testsActions.getTestsSuccess, (state, action) => ({
    ...state,
    tests: action.payload,
    isLoadingTests: false,
  }));

  builder.addCase(testsActions.editQuestionRequest, (state, action) => ({
    ...state,
    isLoadingEditQuestion: true,
    error: null,
  }));
  builder.addCase(testsActions.editQuestionSuccess, (state, action) => ({
    ...state,
    isLoadingEditQuestion: false,
    questions: action.payload,
  }));
  builder.addCase(testsActions.editQuestionFailed, (state, action) => ({
    ...state,
    isLoadingEditQuestion: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.getQuestionRequest, (state, action) => ({
    ...state,
    isLoadingGetQuestion: true,
    error: null,
  }));
  builder.addCase(testsActions.getQuestionSuccess, (state, action) => ({
    ...state,
    isLoadingGetQuestion: false,
    question: action.payload,
  }));
  builder.addCase(testsActions.getQuestionFailed, (state, action) => ({
    ...state,
    isLoadingGetQuestion: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.getQuestionsRequest, (state, action) => ({
    ...state,
    isLoadingGetQuestions: true,
    error: null,
  }));
  builder.addCase(testsActions.getQuestionsSuccess, (state, action) => ({
    ...state,
    isLoadingGetQuestions: false,
    questions: action.payload,
  }));
  builder.addCase(testsActions.getQuestionsFailed, (state, action) => ({
    ...state,
    isLoadingGetQuestions: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.getQuestionGroupsRequest, (state, action) => ({
    ...state,
    isLoadingGetQuestionGroups: true,
    error: null,
  }));
  builder.addCase(testsActions.getQuestionGroupsSuccess, (state, action) => ({
    ...state,
    isLoadingGetQuestionGroups: false,
    questionGroups: action.payload,
  }));
  builder.addCase(testsActions.getQuestionGroupsFailed, (state, action) => ({
    ...state,
    isLoadingGetQuestionGroups: false,
    error: action.payload,
  }));

  builder.addCase(testsActions.setPageSuccess, (state, action) => ({
    ...state,
    page: action.payload,
  }));

  builder.addCase(testsActions.setFilterSuccess, (state, action) => ({
    ...state,
    filter: action.payload,
  }));

  builder.addCase(authenticationActions.logoutSuccess, () => ({
    singleTest: null,
    tests: [],
    results: [],
    subtests: [],
    questions: [],
    question: null,
    questionGroups: [],
    page: {
      total: 0,
      current: 1,
      count: 10,
    },
    filter: {
      sortString: '',
    },
    isLoadingTests: false,
    isLoadingSingleTest: false,
    isLoadingCreateSingleTest: false,
    isLoadingEditSingleTest: false,
    isLoadingCreateQuestion: false,
    isLoadingEditQuestion: false,
    isLoadingGetQuestions: false,
    isLoadingDeleteSingleTest: false,
    isLoadingGetQuestion: false,
    isLoadingGetResults: false,
    isLoadingGetQuestionGroups: false,
    error: null,
  }));
});
