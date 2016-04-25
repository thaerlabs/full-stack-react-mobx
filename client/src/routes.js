import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from 'modules/Pages/Home';

export default function getRoutes() {
  return (
    <Route name="root" path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  );
}
