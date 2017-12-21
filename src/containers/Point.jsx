import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Point } from 'components';
import { fetchPointInfo } from 'redux/modules/point/info';

const PointContainer = connect(
  ({
    card: { ddid },
    point: { info },
  }) => ({ ddid, info }),
  dispapth => bindActionCreators({ fetchPointInfo }, dispapth),
)(Point);

export default PointContainer;
