import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RegisterView from './modules/user/RegisterView';
import LoginView from './modules/user/LoginView';
import MeView from './modules/user/MeView';

export default class Routes extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={LoginView} />
          <Route path='/register' component={RegisterView} />
          <Route path='/me' component={MeView} />
        </Switch>
      </BrowserRouter>
    );
  }
}
