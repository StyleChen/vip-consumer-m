import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'TOPUP/RECEIVE';

const initialState = {
  detail: {},
  list: [],
};

export default createReducer(initialState, {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveTopUp = makeActionCreator(RECEIVE);

export const fetchTopUp = makeAsyncAction(
  ddid => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getTopUp, { ddid }, true);
    if (success) {
      dispatch(receiveTopUp(result));
    }
  },
);
