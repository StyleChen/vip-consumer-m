import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'POINT_INFO/RECEIVE';

// 后台返回的count应该是一个数字类型
export default createReducer({ count: 0 }, {
  [RECEIVE]: (state, action) => action.payload,
});

export const receivePointInfo = makeActionCreator(RECEIVE);

export const fetchPointInfo = makeAsyncAction(
  ddid => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getPoint, {
      ddid,
    }, true);
    if (success) {
      dispatch(receivePointInfo(result));
    }
  },
);
