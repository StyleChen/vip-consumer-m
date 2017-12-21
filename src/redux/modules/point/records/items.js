import { createReducer, makeActionCreator } from 'utils';
import { handleItems } from 'redux/helpers';

const RECEIVE = 'POINT_RECORDS/ITEMS/RECEIVE';
const RESET = 'POINT_RECORDS/ITEMS/RESET';

export default createReducer([], {
  [RECEIVE]: handleItems,

  [RESET]: () => [],
});

export const receivePointRecordsItems = makeActionCreator(RECEIVE);

export const resetPointRecordsItems = makeActionCreator(RESET);
