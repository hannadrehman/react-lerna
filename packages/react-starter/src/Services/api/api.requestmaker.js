/* global process:true */
import axios from 'axios';
import { GET_CSRF } from './api.authorization';
import { STAGE_ORIGIN, STAGE_ACCESS } from '../../Constants/app/app.constants';


const getUrl = (url) => {
  let auth;
  let newUrl = url;
  // proxy origin will only be defined when developing and pointing to stage
  if (process.env.PROXY_ORIGIN === STAGE_ORIGIN) {
    auth = STAGE_ACCESS;
  }
  if (auth) {
    if (url.indexOf('?') === -1) {
      newUrl = `${newUrl}?${auth}`;
    } else {
      newUrl = `${newUrl}&${auth}`;
    }
  }
  return newUrl;
};
const getHeaders = () => {
  if (!process.env.PROXY_ORIGIN === STAGE_ORIGIN) {
    return {
      'X-CSRFToken': GET_CSRF(),
    };
  }
  return {
    'X-CSRFToken': GET_CSRF(),
  };
};
export const httpGet = url => new Promise((resolve, reject) => {
  axios({
    url: getUrl(url),
    method: 'GET',
    headers: {
      'X-CSRFToken': GET_CSRF(),
    },
  })
    .then((res) => {
      resolve(res.data);
    }).catch((err) => {
      if (err.response) {
        reject({ //eslint-disable-line
          data: err.response.data,
          status: err.response.status,
          statusText: err.response.statusText,
        });//eslint-disable-line
      } else {
        reject({ // eslint-disable-line
          data: {
            reason: 'Bad Request',
          },
          status: 400,
          statusText: 'Bad Request',
        });
      }
    });
});
export const httpPost = (url, data) => new Promise((resolve, reject) => {
  axios({
    url: getUrl(url),
    method: 'POST',
    headers: getHeaders(),
    data,
  })
    .then((res) => {
      resolve(res.data);
    }).catch((err) => {
      if (err.response) {
        reject({ //eslint-disable-line
          data: err.response.data,
          status: err.response.status,
          statusText: err.response.statusText,
        });//eslint-disable-line
      } else {
        reject({ // eslint-disable-line
          data: {
            reason: 'Bad Request',
          },
          status: 400,
          statusText: 'Bad Request',
        });
      }
    });
});
