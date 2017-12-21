import { createReducer, makeActionCreator } from 'utils';

const RECEIVE = 'COUPONS/ITEMS/RECEIVE';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveItems = makeActionCreator(RECEIVE);
