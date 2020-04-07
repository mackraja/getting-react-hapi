/**
 * @author {[Monty Khanna]}
 */
import axios from 'axios';
import { omitBy, isUndefined, isNull } from 'lodash';
import store from 'store2';
import {} from 'dotenv/config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

const apiPath = process.env.NODE_ENV === 'development'
 ? 'http://0.0.0.0:' + process.env.REACT_APP_DB_PORT 
 : 'http://0.0.0.0:' + process.env.PORT ;

console.log('env --------- ', process.env);

function formatUrl(path) {
  if (!path) {
    return path;
  }

  if (/^(\/\/|http|https)/.test(path)) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `${apiPath}${adjustedPath}`;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) => {
      this[method] = this._req(method);
    });
  }

  _req = method => (path, { params, data, files } = {}) => new Promise((resolve, reject) => {
      const apiObj = {
          method,
          url: formatUrl(path),
      };

      if (params) {
        const emptySting = val => val === '';
        const cleanFromUndefined = omitBy(params, isUndefined);
        const cleanFromNull = omitBy(cleanFromUndefined, isNull);
        const localParam = omitBy(cleanFromNull, emptySting);
        apiObj.params = localParam || {};
      }

      if (data) {
        apiObj.data = data;
      }

      const http = axios.create ({
          baseURL: apiPath,
          timeout: 10000,
          headers: {'Content-Type': 'application/json'},
      });

      http.interceptors.request.use (
          (config) => {
              const token = store('authToken');
              const refreshToken = store('refreshToken');

              if (token) config.headers.Authorization = `Bearer ${token}`;
              if (refreshToken) config.headers.RefreshToken = refreshToken;
              return config;
          },
          (error) => reject (error)
      );

      http(apiObj)
          .then((response) => {
              resolve(response.data);
          })
          .catch((error) => {
              console.log('Error: To call API', error);
              reject(error);
          });
  });
}
