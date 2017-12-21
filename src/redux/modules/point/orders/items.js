import { createReducer, makeActionCreator } from 'utils';

const RECEIVE = 'POINT/ORDERS/ITEMS/RECEIVE';
const RESET = 'POINT/ORDERS/ITEMS/RESET';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,

  [RESET]: () => [],
});

export const receiveItems = makeActionCreator(RECEIVE);

export const resetItems = makeActionCreator(RESET);
