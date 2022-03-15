import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HistoryExtractor } from './history'
import { SessionContextProvider } from 'contexts/session_context'
import * as routes from '../../constants/routes'
import { registerModels } from '../../models'
import { PathAfterSignIn } from '../../utils/local_storage'
import configureAxios from '../../utils/axios'
import axios from 'axios'
import { Provider } from 'react-redux';
import appStore from '../../store.js';

import ResetPassword from '../users/reset_password'
import ConfirmEmail from '../users/confirm_email'
import SignUp from '../users/sign_up'
import SignIn from '../users/sign_in'
import ForgotPassword from '../users/forgot_password'
import NotFound from '../general/not_found'
import Home from './home'
import Welcome from '../welcome'

configureAxios(axios)
registerModels()

// If we were previously tracking a redirect from an authorized
// page to ask the user to sign in first, clear that.
//
// Sign in will go to default location.
PathAfterSignIn.clear()

const App = props => (
  <Provider store={appStore}>
    <SessionContextProvider>
      <Router>
        <Switch>
          <Route path={`${routes.RESET_PASSWORD}/:reset_password_token`} component={ResetPassword} />
          <Route exact path={routes.SIGN_UP} component={SignUp} />
          <Route exact path={routes.CONFIRM_EMAIL} component={ConfirmEmail} />
          <Route exact path={routes.SIGN_IN} component={SignIn} />
          <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route exact path={routes.WELCOME_PAGE} component={Welcome} />
          <Route exact path={routes.ROOT} component={Home} />
          <Route component={NotFound} />
        </Switch>
        <HistoryExtractor />
      </Router>
    </SessionContextProvider>
  </Provider>
)

export default App
