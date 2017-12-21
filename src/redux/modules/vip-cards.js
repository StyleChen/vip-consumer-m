import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'VIP_CARD_LIST/RECEIVE';

export default createReducer([], {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveVipCards = makeActionCreator(RECEIVE);

export const fetchVipCards = makeAsyncAction(
  (ddid, number) => async (dispatch) => {
    const { success, result } = await ajax.post(apis.bookList, {
      ddid,
      number,
    }, true);
    if (success) {
      dispatch(receiveVipCards(result));
    }
  },
);
