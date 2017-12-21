import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'CARDS/RECEIVE';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveCards = makeActionCreator(RECEIVE);

export const fetchCards = makeAsyncAction(
  geo => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getVIPList, geo, true);
    if (success) {
      dispatch(receiveCards(result));
    }
  },
);
