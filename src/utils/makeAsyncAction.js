import { startFetch, endFetch } from 'redux/modules/global';

const makeAsyncAction = doAjax => (...params) => async (dispatch) => {
  dispatch(startFetch());
  try {
    await doAjax(...params)(dispatch);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(endFetch());
  }
};

export default makeAsyncAction;
