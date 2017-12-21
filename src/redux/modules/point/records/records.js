import { combineReducers } from 'redux';
import { makeAsyncAction, ajax } from 'utils';
import apis from 'apis';
import items, { receivePointRecordsItems, resetPointRecordsItems } from './items';
import total, { receivePointRecordsTotal } from './total';

export const PAGE_SIZE = 10;

export const fetchPointRecords = makeAsyncAction(
  ({ ddid, pageIndex = 1, pageSize = PAGE_SIZE }) => async (dispatch) => {
    if (pageIndex === 1) {
      dispatch(resetPointRecordsItems());
    }

    const { success, result } = await ajax.post(apis.getPointRecordList, {
      ddid, pageIndex, pageSize,
    }, true);

    if (success) {
      dispatch(receivePointRecordsItems(result.data));
      dispatch(receivePointRecordsTotal(result.total));
    }
  },
);

export default combineReducers({
  items,
  total,
});
