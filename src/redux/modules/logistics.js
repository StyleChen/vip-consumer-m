import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'LOGISTICS/RECEIVE';

export default createReducer({ Traces: [], State: '' }, {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveLogistics = makeActionCreator(RECEIVE);

export const fetchLogistics = makeAsyncAction(
  ({ shipperCode, logisticCode }) => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getLogistics, {
      shipperCode,
      logisticCode,
    }, true);
    if (success) {
      dispatch(receiveLogistics(result));
    }
  },
);
