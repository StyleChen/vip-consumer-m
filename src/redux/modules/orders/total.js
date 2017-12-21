import { createReducer, makeActionCreator } from 'utils';

const RECEIVE = 'ORDERS/TOTAL/RECEIVE';

export default createReducer(0, {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveTotal = makeActionCreator(RECEIVE);
