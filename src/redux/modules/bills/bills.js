import { combineReducers } from 'redux';
import { makeAsyncAction, ajax } from 'utils';
import apis from 'apis';
import items, { receiveItems, resetItems } from './items';
import total, { receiveTotal } from './total';

export const PAGE_SIZE = 10;

const mapTypeToState = {
  all: '',
  topup: 'P',
  consume: 'SA',
};

export const fetchBills = makeAsyncAction(
  ({ ddid, type, pageIndex = 1, pageSize = PAGE_SIZE }) => async (dispatch) => {
    if (pageIndex === 1) {
      dispatch(resetItems());
    }

    const { success, result } = await ajax.post(apis.getBillList, {
      ddid,
      type: mapTypeToState[type],
      pageIndex,
      pageSize,
    }, true);

    if (success) {
      dispatch(receiveItems(result.data));
      dispatch(receiveTotal(result.total));
    }
  },
);

export default combineReducers({
  items,
  total,
});
