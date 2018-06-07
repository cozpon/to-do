import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reducers from './reducers';
import thunk from 'redux-thunk';
import './index.css';

import App from './containers/App';
import Register from './containers/Register';
import Reset from './containers/Reset';
import LogIN from './containers/LogIN';

//---------SERVICEWORKERS-------------------
import registerServiceWorker from './lib/registerServiceWorker';

// ------STORE--------------------------
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// Using React-Router-Dom for app expansion, to allow routing between (future) containers
ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <div id="source">
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={Reset} />
        <Route path="/login" component={LogIN} />
      </div>
    </Router>
  </Provider>,
document.getElementById('root')
);

registerServiceWorker();