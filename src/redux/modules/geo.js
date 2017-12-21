import { createReducer, makeActionCreator } from 'utils';

const CHANGE = 'GEO/CHANGE';

export default createReducer({ x: 0, y: 0 }, {
  [CHANGE]: (state, action) => action.payload,
});

export const changeGeo = makeActionCreator(CHANGE);

export const getGeo = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(
    pos => dispatch(changeGeo({
      x: pos.coords.latitude,
      y: pos.coords.longitude,
    })),
    error => console.log(error),
    {
      enableHighAccuracy: true,
    },
  );
};
