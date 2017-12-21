import { createReducer, makeActionCreator } from 'utils';

export const CHANGE = 'USER_ADDR/CHANGE';
export const RESET = 'USER_ADDR/RESET';

const initialState = {
  id: 0,
  name: '',
  mobile: '',
  area: {
    province: { name: '', code: '' },
    city: { name: '', code: '' },
    district: { name: '', code: '' },
  },
  address: '',
  title: '',
  isDefault: false,
  tel: '',
  code: '',
  x: 0,
  y: 0,
};

export default createReducer(initialState, {
  [CHANGE]: (state, action) => ({ ...state, ...action.payload }),

  [RESET]: () => initialState,
});

export const changeUserAddr = makeActionCreator(CHANGE);
export const resetUserAddr = makeActionCreator(RESET);
