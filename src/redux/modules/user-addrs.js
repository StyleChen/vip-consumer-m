import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'USER_ADDRS/RECEIVE';
const CHANGE_DEFAULT = 'USER_ADDRS/CHANGE_DEFAULT';
const REMOVE = 'USER_ADDRS/REMOVE';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,

  [CHANGE_DEFAULT]: (state, action) => state.map((addr) => {
    if (addr.id === action.payload) {
      return ({ ...addr, isDefault: true });
    }
    return ({ ...addr, isDefault: false });
  }),

  [REMOVE]: (state, action) => state.filter(addr => addr.id !== action.payload),
});

export const receiveUserAddrs = makeActionCreator(RECEIVE);
export const changeUserAddrDefault = makeActionCreator(CHANGE_DEFAULT);
export const removeUserAddr = makeActionCreator(REMOVE);

export const fetchUserAddrs = makeAsyncAction(
  () => async (dispatch) => {
    const { success, result } = await ajax.get(apis.getUserAddr, true);
    if (success) {
      dispatch(receiveUserAddrs(result));
    }
  },
);
