import { createReducer, makeActionCreator } from 'utils';

export const RESET = 'GLOBAL/RESET';

const START = 'GLOBAL/FETCH/START';
const END = 'GLOBAL/FETCH/END';

const initialState = {
  fetching: false,
};

export default createReducer(initialState, {
  [START]: state => ({ ...state, fetching: true }),
  [END]: state => ({ ...state, fetching: false }),
});

export const resetState = makeActionCreator(RESET);
export const startFetch = makeActionCreator(START);
export const endFetch = makeActionCreator(END);
