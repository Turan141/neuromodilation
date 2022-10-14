import { createReducer } from '@reduxjs/toolkit';

import { legalEntitiesActions } from '@bus/legalEntities/actions';
import { authenticationActions } from '@bus/authentication/actions';
import { singleLegalEntitieType } from 'src/interfaces/LegalEntities';

interface InitialState {
  singleLegalEntitie: singleLegalEntitieType | null;
  legalEntities: singleLegalEntitieType[];
  page: {
    total: number;
    current: number;
    count: number;
  };
  filter: {
    sortString: string | null;
  };
  isLoadingLegalEntities: boolean;
  isLoadingSingleLegalEntitie: boolean;
  isLoadingCreatingLegalEntitie: boolean;
  error: string | null;
}

const initialState: InitialState = {
  singleLegalEntitie: null,
  legalEntities: [],
  page: {
    total: 0,
    current: 0,
    count: 10,
  },
  filter: {
    sortString: 'id',
  },
  isLoadingLegalEntities: false,
  isLoadingSingleLegalEntitie: false,
  isLoadingCreatingLegalEntitie: false,
  error: null,
};

export const legalEntitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    legalEntitiesActions.getSingleLegalEntitieRequest,
    (state) => ({
      ...state,
      isLoadingSingleLegalEntitie: true,
      error: null,
    }),
  );

  builder.addCase(
    legalEntitiesActions.getSingleLegalEntitieSuccess,
    (state, action) => ({
      ...state,
      singleLegalEntitie: action.payload,
      isLoadingSingleLegalEntitie: false,
    }),
  );

  builder.addCase(
    legalEntitiesActions.getSingleLegalEntitieFailed,
    (state, action) => ({
      ...state,
      error: action.payload,
    }),
  );

  builder.addCase(legalEntitiesActions.getLegalEntitiesRequest, (state) => ({
    ...state,
    isLoadingLegalEntities: true,
    error: null,
  }));

  builder.addCase(
    legalEntitiesActions.getLegalEntitiesSuccess,
    (state, action) => ({
      ...state,
      legalEntities: action.payload,
      isLoadingLegalEntities: false,
    }),
  );

  builder.addCase(
    legalEntitiesActions.getLegalEntitiesFailed,
    (state, action) => ({
      ...state,
      error: action.payload,
    }),
  );

  builder.addCase(legalEntitiesActions.setPageSuccess, (state, action) => ({
    ...state,
    page: action.payload,
  }));

  builder.addCase(legalEntitiesActions.setFilterSuccess, (state, action) => ({
    ...state,
    filter: action.payload,
  }));

  builder.addCase(authenticationActions.logoutSuccess, () => ({
    singleLegalEntitie: null,
    legalEntities: [],
    page: {
      total: 0,
      current: 1,
      count: 10,
    },
    filter: {
      sortString: '',
    },
    isLoadingLegalEntities: false,
    isLoadingSingleLegalEntitie: false,
    isLoadingCreatingLegalEntitie: false,
    error: null,
  }));

  builder.addCase(
    legalEntitiesActions.createLegalEntitieRequest,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: true,
      error: null,
    }),
  );
  builder.addCase(
    legalEntitiesActions.createLegalEntitieFailed,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: false,
      error: action.payload,
    }),
  );

  builder.addCase(
    legalEntitiesActions.createLegalEntitieSuccess,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: false,
      legalEntities: [action.payload, ...state.legalEntities],
    }),
  );

  builder.addCase(
    legalEntitiesActions.editLegalEntitieRequest,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: true,
      error: null,
    }),
  );
  builder.addCase(
    legalEntitiesActions.editLegalEntitieFailed,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: false,
      error: action.payload,
    }),
  );

  builder.addCase(
    legalEntitiesActions.editLegalEntitieSuccess,
    (state, action) => ({
      ...state,
      isLoadingCreatingLegalEntitie: false,
      legalEntities: action.payload,
    }),
  );

  builder.addCase(
    legalEntitiesActions.deleteLegalEntitieRequest,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: true,
      error: null,
    }),
  );
  builder.addCase(
    legalEntitiesActions.deleteLegalEntitieFailed,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: false,
      error: action.payload,
    }),
  );

  builder.addCase(
    legalEntitiesActions.deleteLegalEntitieSuccess,
    (state, action) => ({
      ...state,
      isLoadingLegalEntities: false,
      legalEntities: action.payload,
    }),
  );
});
