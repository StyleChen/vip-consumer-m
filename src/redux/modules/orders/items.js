import { createReducer, makeActionCreator } from 'utils';

const RECEIVE = 'ORDERS/ITEMS/RECEIVE';
const RESET = 'ORDERS/ITEMS/RESET';
const REMOVE = 'ORDERS/ITEMS/REMOVE';

export default createReducer([], {
  [RECEIVE]: (state, { payload }) => [...state, ...payload],

  [REMOVE]: (state, action) => (
    state.filter(item => item.number !== action.payload)
  ),

  [RESET]: () => [],
});

export const receiveItems = makeActionCreator(RECEIVE);

export const resetItems = makeActionCreator(RESET);

export const removeItem = makeActionCreator(REMOVE);
