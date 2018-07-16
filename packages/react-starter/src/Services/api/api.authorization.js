import axios from 'axios';
import { DEV_ORIGIN, USER_ONE_NAME, USER_ONE_PAS } from '../../Constants/app/app.constants';
import { APP_LOGIN } from '../../Constants/api/api.endpoints';

export const GET_CSRF = () => {
  const csrf = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
  return csrf ? csrf.pop() : '';
};

if (window.location.origin === DEV_ORIGIN) {
  window.attemptLogin = () => axios.post(APP_LOGIN, {
    username: USER_ONE_NAME, password: USER_ONE_PAS,
  })
    .then(() => {
        console.log('login');// eslint-disable-line
    });
}

export const TEMP_CSRF = 'temp';
