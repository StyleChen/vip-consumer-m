import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TopUp } from 'components';
import { fetchTopUp } from 'redux/modules/top-up';

const TopUpContainer = connect(
  ({
    card: { ddid, number },
    topUp: { list, detail },
  }) => ({ ddid, number, list, detail }),
  dispatch => bindActionCreators({ fetchTopUp }, dispatch),
)(TopUp);

export default TopUpContainer;
