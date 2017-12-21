import { createReducer, makeActionCreator } from 'utils';

const RECEIVE = 'POINT_RECORDS/TOTAL/RECEIVE';

export default createReducer(0, {
  [RECEIVE]: (state, action) => action.payload,
});

export const receivePointRecordsTotal = makeActionCreator(RECEIVE);
