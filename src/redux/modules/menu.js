import { createReducer, makeActionCreator } from 'utils';

const TOGGLE = 'MENU/TOGGLE';
const HIDE = 'MENU/HIDE';

export default createReducer(false, {
  [TOGGLE]: state => !state,
  [HIDE]: () => false,
});

export const toggleMenu = makeActionCreator(TOGGLE);
export const hideMenu = makeActionCreator(HIDE);
