import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'components';
import { fetchCard, changeMoneyShowState } from 'redux/modules/card';

const CardContainer = connect(
  ({ card }) => ({ card }),
  dispatch => bindActionCreators({ fetchCard, changeMoneyShowState }, dispatch),
)(Card);

export default CardContainer;
