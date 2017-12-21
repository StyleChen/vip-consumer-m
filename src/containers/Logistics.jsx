import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Logistics } from 'components';
import { fetchLogistics } from 'redux/modules/logistics';

const LogisticsContainer = connect(
  ({ logistics: { State, Traces } }) => ({ State, Traces }),
  dispatch => bindActionCreators({ fetchLogistics }, dispatch),
)(Logistics);

export default LogisticsContainer;
