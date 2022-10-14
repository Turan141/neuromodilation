import api from './BaseApi';

interface authorizeType {
  login: string;
  password: string;
}

export const login = (data: authorizeType) => {
  return api.post('/Auth/login', data);
};

export const refresh = () => {
  return api.post('/Auth/refresh', {});
};

export const logout = (data: any) => {
  return api.post('/Auth/revoke', data);
};
