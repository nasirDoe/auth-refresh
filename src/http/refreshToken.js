// for multiple requests
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default function axiosInterceptors(store) {
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      const code = error.response.status;
      if ([401, 403].includes(code) && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          axios
            .get('/token')
            .then(({ data }) => {
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
              originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
              store.commit('user/SET_USER_TOKEN', data.accessToken);
              processQueue(null, data.accessToken);
              resolve(axios(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );
}
