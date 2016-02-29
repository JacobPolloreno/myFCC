import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './pages/Layout';

const app = document.getElementById('app');

ReactDOM.render(
  <Layout/>,
app);

injectTapEventPlugin();
