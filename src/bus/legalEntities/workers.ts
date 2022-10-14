import { call, put, select } from 'redux-saga/effects';

import { legalEntitiesActions } from '@bus/legalEntities/actions';
import { getLegalEntities } from '@bus/legalEntities/selector';

import {
  createLegalEntitie,
  deleteLegalEntitie,
  editLegalEntitie,
  getLegalEntitiesApi,
  getSingleEntitieApi,
} from '@api/LegalEntities';
import { singleLegalEntitieType } from 'src/interfaces/LegalEntities';

export function* workerGetSingleLegalEntitie(action: any) {
  yield put(legalEntitiesActions.getSingleLegalEntitieRequest());

  const id = action.payload;

  const { data } = yield call(getSingleEntitieApi, id);

  yield put(legalEntitiesActions.getSingleLegalEntitieSuccess(data));
}

export function* workerGetLegalEntities(action: any): any {
  yield put(legalEntitiesActions.getLegalEntitiesRequest());

  const { count, current, sortString } = action.payload;

  let legaEntities = yield select(getLegalEntities);

  yield put(
    legalEntitiesActions.setPageSuccess({
      ...legaEntities.page,
      count: count ? count : legaEntities.page.count,
      current: current !== undefined ? current : legaEntities.page.current,
    }),
  );

  yield put(
    legalEntitiesActions.setFilterSuccess({
      ...legaEntities.filter,
      sortString: sortString ? sortString : legaEntities.filter.sortString,
    }),
  );

  legaEntities = yield select(getLegalEntities);

  const take = legaEntities.page.count;
  const skip = legaEntities.page.count * legaEntities.page.current;

  const response = yield call(getLegalEntitiesApi, {
    skip,
    take,
    // sortString: legaEntities.filter.sortString,
  });

  if (response) {
    yield put(
      legalEntitiesActions.getLegalEntitiesSuccess(response.data.result),
    );
    yield put(
      legalEntitiesActions.setPageSuccess({
        ...legaEntities.page,
        total: response.data.total,
      }),
    );
  }

  yield put(legalEntitiesActions.getLegalEntitiesFailed(null));
}

export function* workerCreateLegalEntitie(action: any) {
  yield put(legalEntitiesActions.createLegalEntitieRequest());
  const singleLegalEntitie = action.payload;

  let { page } = yield select(getLegalEntities);

  const { data } = yield call(createLegalEntitie, singleLegalEntitie);
  yield put(
    legalEntitiesActions.setPageSuccess({
      ...page,
      total: page.total + 1,
    }),
  );
  yield put(legalEntitiesActions.createLegalEntitieSuccess(data));
}

export function* workerEditLegalEntitie(action: any): any {
  yield put(legalEntitiesActions.editLegalEntitieRequest());
  const singleLegalEntitie = action.payload;

  const { legalEntities } = yield select(getLegalEntities);

  const { data } = yield call(editLegalEntitie, singleLegalEntitie);
  if (data) {
    const editedLegaEntities = legalEntities.map(
      (legalEntitie: singleLegalEntitieType) =>
        legalEntitie.id === data.id ? data : legalEntitie,
    );

    yield put(legalEntitiesActions.editLegalEntitieSuccess(editedLegaEntities));
  }
}

export function* workerDeleteLegalEntitie(action: any): any {
  yield put(legalEntitiesActions.deleteLegalEntitieRequest());
  const { payload } = action;

  const { legalEntities, page } = yield select(getLegalEntities);

  yield call(deleteLegalEntitie, payload);

  yield put(
    legalEntitiesActions.setPageSuccess({
      ...page,
      total: page.total - 1,
    }),
  );

  const editedLegaEntities = legalEntities.filter(
    (legalEntitie: singleLegalEntitieType) => legalEntitie.id !== payload.id,
  );

  yield put(legalEntitiesActions.deleteLegalEntitieSuccess(editedLegaEntities));
}
