import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import history from './history';

import Layout from './pages/Layout';
import List from './pages/List';
import Details from './pages/Details';
import RecipeData from './RecipeData';

// Load mock data into local storage
RecipeData.init();

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={history}>
    <Route path="/myFCC/recipes/" component={Layout}>
      <IndexRoute component={List}></IndexRoute>
      <Route path="recipe/:title" component={Details}></Route>
    </Route>
  </Router>,
app);
