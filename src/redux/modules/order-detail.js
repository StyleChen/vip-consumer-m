import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';
import { RESET } from './global';

const RECEIVE = 'ORDER_DETAIL/RECEIVE';

const initialState = {
  data: {
    items: [],
  },
  traces: [],
};

export default createReducer(initialState, {
  [RECEIVE]: (state, action) => action.payload,
  [RESET]: () => initialState,
});

export const receiveOrderDetail = makeActionCreator(RECEIVE);

export const fetchOrderDetail = makeAsyncAction(
  orderNumber => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getOrderDetail, { number: orderNumber }, true);
    if (success) {
      dispatch(receiveOrderDetail(result));
    }
  },
);
