/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import rootReducer from './rootReducer';

const composed = [
  applyMiddleware(thunk),
  persistState(undefined, {
    key: 'myj-vip-buyer',
    slicer: () => ({
      geo, cards, card, userinfo, pointDetail, userAddr,
    }) => ({
      geo, cards, card, userinfo, pointDetail, userAddr,
    }),
  }),
];

const enhancer = (process.env.NODE_ENV === 'production') ? (
  compose(...composed)
) : (() => {
  const DevTools = require('../containers/DevTools').default;
  return compose(...composed, DevTools.instrument());
})();

const configureStore = () => {
  const store = createStore(rootReducer, undefined, enhancer);

  if (module.hot) {
    module.hot.accept('./rootReducer', () =>
      store.replaceReducer(require('./rootReducer').default),
    );
  }

  return store;
};

export default configureStore;
