import { authenticationActions } from '@bus/authentication/actions';
import store from '@redux/store';
import axios, { AxiosRequestConfig } from 'axios';
import { Store as notification } from 'react-notifications-component';

const notificationOptions: any = {
  title: 'Ошибка',
  type: 'danger',
  insert: 'top',
  container: 'top-right',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
};


const api = axios.create({
  withCredentials: true,
  baseURL: `${process.env.API_URL}/v1`,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig & any): AxiosRequestConfig => {
    const token = localStorage.getItem('@admin_ACCESS_TOKEN');
    config.headers[`Access-Control-Allow-Credentials`] = true;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
);
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status && error.response.status !== 401) {
      notification.addNotification({
        ...notificationOptions,
        message: error.response.data.message || 'Что-то пошло не так',
      });
    }

    if (error.response.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response: any = await axios({
          method: 'POST',
          url: `${process.env.API_URL}/v1/Auth/refresh`,
          data: {},
          withCredentials: true,
        });
        localStorage.setItem('@admin_ACCESS_TOKEN', response.data.accessToken);
        return api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    if (error.response.status === 401 && error.config?._isRetry) {
      store.dispatch(authenticationActions.authenticationSuccess(false));
      localStorage.removeItem('@admin_ACCESS_TOKEN');
      window.location.reload();
    }
  },
);

export default api;
