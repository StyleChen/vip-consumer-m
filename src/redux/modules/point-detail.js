import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'POINT_DETAIL/RECEIVE';

export default createReducer({}, {
  [RECEIVE]: (state, action) => action.payload,
});

export const receivePointDetail = makeActionCreator(RECEIVE);

export const fetchPointDetail = makeAsyncAction(
  ({ ddid, id }) => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getPointDetail, {
      ddid,
      id,
    }, true);
    if (success) {
      dispatch(receivePointDetail(result));
    }
  },
);
