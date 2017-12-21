import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'POINT_STORES/RECEIVE';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,
});

export const receivePointStores = makeActionCreator(RECEIVE);

export const fetchPointStores = makeAsyncAction(
  ddid => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getPointStores, {
      ddid,
    }, true);
    if (success) {
      dispatch(receivePointStores(result));
    }
  },
);
