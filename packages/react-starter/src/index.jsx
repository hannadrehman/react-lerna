import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'babel-polyfill';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import App from 'App';
import configureStore from 'Store';

const reduxStore = configureStore();

const render = (Component, store) => {
  ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
      <Component store={store} />
    </MuiPickersUtilsProvider>,
    document.getElementById('root'),
  );
};
/* global module:true */
if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default; // eslint-disable-line
    render(NewApp, reduxStore);
  });
}

render(App, reduxStore);
