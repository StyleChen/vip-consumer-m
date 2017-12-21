import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loss } from 'components';
import { changeCard, fetchCardState } from 'redux/modules/card';

const LossContainer = connect(
  ({ card: { ddid, state, stateid } }) => ({ ddid, state, stateid }),
  dispatch => bindActionCreators({ changeCard, fetchCardState }, dispatch),
)(Loss);

export default LossContainer;
