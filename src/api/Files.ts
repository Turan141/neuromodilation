import api from './BaseApi';

export const addFile = (data: any) => {
  return api.post('/Files', data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const getAllFiles = () => {
  return api.get('/Files', {
    params: {
      skip: 0,
      take: 1000,
    },
  });
};

export const deleteFile = (id: string | undefined) => {
  return api.delete('/Files', {
    params: { fileId: id },
  });
};
