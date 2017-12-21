import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Store } from 'components';
import { getGeo } from 'redux/modules/geo';
import { fetchStores } from 'redux/modules/stores';

const StoreContainer = connect(
  ({ geo, card: { ddid }, stores }) => ({ geo, ddid, stores }),
  dispatch => bindActionCreators({ getGeo, fetchStores }, dispatch),
)(Store);

export default StoreContainer;
