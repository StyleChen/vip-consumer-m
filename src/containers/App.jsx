import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { App } from 'components';
import { hideMenu } from 'redux/modules/menu';
import { getGeo } from 'redux/modules/geo';

const AppContainer = connect(
  ({ menu }) => ({ menu }),
  dispatch => bindActionCreators({ hideMenu, getGeo }, dispatch),
)(App);

export default AppContainer;
