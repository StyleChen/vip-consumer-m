import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { VipBook } from 'components';
import { fetchVipCards } from 'redux/modules/vip-cards';

const VipBookContainer = connect(
  ({ card: { ddid }, global: { fetching }, vipCards }) => ({ ddid, vipCards, fetching }),
  dispatch => bindActionCreators({ fetchVipCards }, dispatch),
)(VipBook);

export default VipBookContainer;
