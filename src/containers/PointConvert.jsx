import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PointConvert } from 'components';
import { fetchPointStores } from 'redux/modules/point-stores';

const PointConvertContainer = connect(
  ({
    card: { ddid, phone },
    point: { info },
    pointStores,
    pointDetail,
  }) => ({ ddid, phone, info, pointStores, pointDetail }),
  dispapth => bindActionCreators({ fetchPointStores }, dispapth),
)(PointConvert);

export default PointConvertContainer;
