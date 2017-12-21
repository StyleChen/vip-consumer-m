/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from 'containers';
import configureStore from './redux/configureStore';
import './styles/base.css';


const store = configureStore();

const content = (process.env.NODE_ENV === 'production') ? (
  <Provider store={store}>
    <App />
  </Provider>
) : (() => {
  const { AppContainer } = require('react-hot-loader');
  const DevTools = require('./containers/DevTools').default;
  return (
    <AppContainer>
      <Provider store={store}>
        <div className="dev-only">
          <App />
          <DevTools />
        </div>
      </Provider>
    </AppContainer>
  );
})();

ReactDOM.render(
  content,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
