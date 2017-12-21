import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PointConvertList } from 'components';
import { fetchPointConverts } from 'redux/modules/point/converts/converts';

const PointConvertListContainer = connect(
  ({
    card: { ddid },
    global: { fetching },
    point,
  }) => ({ ddid, fetching, ...point.converts }),
  dispapth => bindActionCreators({ fetchPointConverts }, dispapth),
)(PointConvertList);

export default PointConvertListContainer;
