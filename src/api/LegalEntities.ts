import api from './BaseApi';
import { singleLegalEntitieType } from 'src/interfaces/LegalEntities';

export const getLegalEntitiesApi = (data: any) => {
  return api.get('/Company/list', { params: data });
};
export const getSingleEntitieApi = (id: number) => {
  return api.get('/Company', { params: id });
};

export const deleteLegalEntitie = (id: number) => {
  return api.delete('/Company', { params: id });
};

export const createLegalEntitie = (legalEntitie: singleLegalEntitieType) => {
  return api.post('/Company', legalEntitie);
};

export const editLegalEntitie = (legalEntitie: singleLegalEntitieType) => {
  return api.put('/Company', legalEntitie);
};
