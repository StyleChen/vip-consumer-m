import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PointDetail } from 'components';
import { fetchPointDetail } from 'redux/modules/point-detail';

const PointDetailContainer = connect(
  ({ card: { ddid }, pointDetail }) => ({ ddid, pointDetail }),
  dispapth => bindActionCreators({ fetchPointDetail }, dispapth),
)(PointDetail);

export default PointDetailContainer;
