import { createReducer, makeActionCreator } from 'utils';

const RECEIVE = 'POINT/CONVERTS/ITEMS/RECEIVE';
const RESET = 'POINT/CONVERTS/ITEMS/RESET';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,

  [RESET]: () => [],
});

export const receiveItems = makeActionCreator(RECEIVE);

export const resetItems = makeActionCreator(RESET);
