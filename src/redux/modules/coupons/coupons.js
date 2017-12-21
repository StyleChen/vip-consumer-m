import { combineReducers } from 'redux';
import { makeAsyncAction, ajax } from 'utils';
import apis from 'apis';
import items, { receiveItems } from './items';

const mapTypeToState = {
  unused: 1,
  used: 2,
  expired: 3,
};

export const fetchCoupons = makeAsyncAction(
  ({ ddid, type }) => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getCouponList, {
      ddid,
      state: mapTypeToState[type],
    }, true);

    if (success) {
      dispatch(receiveItems(result));
    }
  },
);

export default combineReducers({
  items,
});
