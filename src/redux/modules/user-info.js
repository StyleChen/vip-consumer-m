import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';
import { RESET } from './global';

const RECEIVE = 'USER_INFO/RECEIVE';
const CHANGE = 'USER_INFO/CHANGE';

const initialState = {
  logo: '',
  name: '',
  sex: '',
  address: '',
  area: '',
  brithday: '',
  phone: '',
  number: '',
  level: '',
};

export default createReducer(initialState, {
  [RECEIVE]: (state, action) => action.payload,
  [CHANGE]: (state, action) => ({ ...state, ...action.payload }),
  [RESET]: () => initialState,
});

export const receiveUserInfo = makeActionCreator(RECEIVE);

export const changeUserInfo = makeActionCreator(CHANGE);

export const fetchUserInfo = makeAsyncAction(
  ddid => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getUserInfo, {
      ddid,
    }, true);
    if (success) {
      dispatch(receiveUserInfo(result));
    }
  },
);
