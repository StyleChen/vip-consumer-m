import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';

const RECEIVE = 'COLLECTION/RECEIVE';
// const CHANGE = 'COLLECTION/CHANGE';


const initialState = {
  data: [],
};

export default createReducer(initialState, {
  [RECEIVE]: (state, action) => action.payload,
});

export const receiveCollection = makeActionCreator(RECEIVE);

export const fetchCollection = makeAsyncAction(
  (pageIndex = 1, pageSize = 99) => async (dispatch) => {
    const { success, result } = await ajax.post(apis.collect, {
      pageIndex,
      pageSize,
    }, true);
    if (success) {
      dispatch(receiveCollection(result));
    }
  },
);

