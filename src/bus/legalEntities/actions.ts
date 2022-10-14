import { createAction } from '@reduxjs/toolkit';

import { legalEntitiesTypes } from '@bus/legalEntities/types';

export const legalEntitiesActions = {
  getLegalEntitiesRequest: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIES_REQUEST,
  ),
  getLegalEntitiesSuccess: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIES_SUCCESS,
    (data) => ({ payload: data }),
  ),
  getLegalEntitiesFailed: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIES_FAILED,
    (data) => ({ payload: data }),
  ),

  getSingleLegalEntitieRequest: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIE_SINGLE_REQUEST,
  ),
  getSingleLegalEntitieSuccess: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIE_SINGLE_SUCCESS,
    (data) => ({ payload: data }),
  ),
  getSingleLegalEntitieFailed: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIE_SINGLE_FAILED,
    (data) => ({ payload: data }),
  ),

  setPageSuccess: createAction(legalEntitiesTypes.SET_PAGE_SUCCESS, (data) => ({
    payload: data,
  })),
  setFilterSuccess: createAction(
    legalEntitiesTypes.SET_FILTER_SUCCESS,
    (data) => ({ payload: data }),
  ),

  getSingleLegalEntitieAsync: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIE_SINGLE_ASYNC,
    (data) => ({ payload: data }),
  ),

  getLegalEntitiesAsync: createAction(
    legalEntitiesTypes.GET_LEGAL_ENTITIES_ASYNC,
    (data) => ({ payload: data }),
  ),
  setPageAsync: createAction(legalEntitiesTypes.SET_FILTER_SUCCESS, (data) => ({
    payload: data,
  })),
  setFilterAsync: createAction(legalEntitiesTypes.SET_FILTER_ASYNC, (data) => ({
    payload: data,
  })),

  createLegalEntitieRequest: createAction(
    legalEntitiesTypes.CREATE_LEGAL_ENTITIE_REQUEST,
  ),
  createLegalEntitieSuccess: createAction(
    legalEntitiesTypes.CREATE_LEGAL_ENTITIE_SUCCESS,
    (data) => ({ payload: data }),
  ),
  createLegalEntitieFailed: createAction(
    legalEntitiesTypes.CREATE_LEGAL_ENTITIE_FAILED,
    (data) => ({ payload: data }),
  ),
  createLegalEntitieAsync: createAction(
    legalEntitiesTypes.CREATE_LEGAL_ENTITIE_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  editLegalEntitieRequest: createAction(
    legalEntitiesTypes.EDIT_LEGAL_ENTITIE_REQUEST,
  ),
  editLegalEntitieSuccess: createAction(
    legalEntitiesTypes.EDIT_LEGAL_ENTITIE_SUCCESS,
    (data) => ({ payload: data }),
  ),
  editLegalEntitieFailed: createAction(
    legalEntitiesTypes.EDIT_LEGAL_ENTITIE_FAILED,
    (data) => ({ payload: data }),
  ),
  editLegalEntitieAsync: createAction(
    legalEntitiesTypes.EDIT_LEGAL_ENTITIE_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  deleteLegalEntitieRequest: createAction(
    legalEntitiesTypes.DELETE_LEGAL_ENTITIE_REQUEST,
  ),
  deleteLegalEntitieSuccess: createAction(
    legalEntitiesTypes.DELETE_LEGAL_ENTITIE_SUCCESS,
    (data) => ({ payload: data }),
  ),
  deleteLegalEntitieFailed: createAction(
    legalEntitiesTypes.DELETE_LEGAL_ENTITIE_FAILED,
    (data) => ({ payload: data }),
  ),
  deleteLegalEntitieAsync: createAction(
    legalEntitiesTypes.DELETE_LEGAL_ENTITIE_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),
};
