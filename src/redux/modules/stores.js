import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'STORES/RECEIVE';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveStores = makeActionCreator(RECEIVE);

export const fetchStores = makeAsyncAction(
  ({ ddid, x, y }) => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getStoreList, {
      ddid,
      x,
      y,
    }, true);
    if (success) {
      dispatch(receiveStores(result));
    }
  },
);
