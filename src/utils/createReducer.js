/**
 * Redux reducer creator
 * @param {any} type - default value of the state
 * @param {Object} handlers - functions to handle each accepted action
 */

function createReducer(defaultState, handlers = {}) {
  const actionTypes = Object.keys(handlers);
  const len = actionTypes.length;

  return function reducer(state = defaultState, action) {
    for (let i = 0; i < len; i += 1) {
      const actionType = actionTypes[i];
      if (actionType === action.type) {
        return handlers[actionType](state, action);
      }
    }
    return state;
  };
}

export default createReducer;
