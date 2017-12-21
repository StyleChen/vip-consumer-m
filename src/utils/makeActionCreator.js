/**
 * Redux actionCreator creator
 * @param {string} type - type of the action
 * @param {string[]} [propNames] - names of other properties of the action
 */

const makeActionCreator = type => payload => (payload ? {
  type,
  payload,
} : {
  type,
});

export default makeActionCreator;
