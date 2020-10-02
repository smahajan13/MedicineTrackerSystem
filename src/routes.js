import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Details from "./pages/details";
import Home from './pages/home'
import React from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const Routes = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route path="/:id/details" component={Details} />
      </Switch>
    </Router>
  );
};
export default Routes;
