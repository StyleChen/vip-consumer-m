import { createReducer, makeActionCreator, makeAsyncAction, ajax } from 'utils';
import apis from 'apis';
import { RESET } from './global';

const CHANGE = 'CARD/CHANGE';

const initialState = {
  ddid: sessionStorage.ddid || 48,
  company: '',
  logo: '',
  number: '',
  phone: '',
  cz_money: 0,
  give_money: 0,
  totalfee: 0,
  qty: null,
  issee: 0,
  czstate: 2,
  vipstate: 0,

  state: '正常',
  stateid: 1,
};

export default createReducer(initialState, {
  [CHANGE]: (state, action) => ({ ...state, ...action.payload }),
  [RESET]: () => initialState,
});

export const changeCard = makeActionCreator(CHANGE);

export const fetchCard = makeAsyncAction(
  ddid => async (dispatch) => {
    const {
      success,
      result: { companyinfo, detail, state },
    } = await ajax.post(apis.getVIPDetail, { ddid }, true);
    if (success) {
      const detailArray = Object.keys(detail);
      dispatch(changeCard({ vipstate: state }));
      if (detailArray.length === 0) {
        const companyData = Object.assign(initialState, companyinfo);
        dispatch(changeCard(companyData));
      } else {
        dispatch(changeCard({ ...companyinfo, ...detail }));
      }
    }
  },
);

export const fetchCardState = makeAsyncAction(
  ddid => async (dispatch) => {
    const { success, result } = await ajax.post(apis.getCardState, {
      ddid,
    }, true);
    if (success) {
      dispatch(changeCard(result));
    }
  },
);

export const changeMoneyShowState = makeAsyncAction(
  (ddid, lastIssee) => async (dispatch) => {
    const issee = +!lastIssee;
    dispatch(changeCard({ issee }));

    await ajax.post(apis.changeBalanceShow, { ddid, issee }, true);
  },
);
