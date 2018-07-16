import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Async from 'react-code-splitting';
import { ErrorHandler } from 'App/Common';

import './Routes.styles.scss';

const AsyncHome = props => (<Async componentProps={props} load={import('./Home/Home.component' /* webpackChunkName: "home" */)} />);
const AsyncProfile = props => (<Async componentProps={props} load={import('./Profile/Profile.component' /* webpackChunkName: "profile" */)} />);

const Routes = () => (
  <div className="routes-wrapper">
    <ErrorHandler>
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route exact path="/profile" component={AsyncProfile} />
      </Switch>
    </ErrorHandler>
  </div>
);
export default withRouter(Routes);
