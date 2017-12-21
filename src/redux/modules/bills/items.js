import { createReducer, makeActionCreator } from 'utils';
import { handleItems } from 'redux/helpers';

const RECEIVE = 'BILLS/ITEMS/RECEIVE';
const RESET = 'BILLS/ITEMS/RESET';

export default createReducer([], {
  [RECEIVE]: handleItems,

  [RESET]: () => [],
});

export const receiveItems = makeActionCreator(RECEIVE);

export const resetItems = makeActionCreator(RESET);
