import { combineReducers } from 'redux';
import { ajax, makeAsyncAction } from 'utils';
import apis from 'apis';
import items, { receiveItems } from './items';

export const fetchPointOrders = makeAsyncAction(
  ({ ddid }) => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getPointOrderList, { ddid }, true);

    if (success) {
      dispatch(receiveItems(result));
    }
  },
);

export default combineReducers({
  items,
});
