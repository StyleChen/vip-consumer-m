import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PointRecordList } from 'components';
import { fetchPointRecords } from 'redux/modules/point/records/records';

const PointRecordListContainer = connect(
  ({
    card: { ddid },
    global: { fetching },
    point,
  }) => ({ ddid, fetching, ...point.records }),
  dispapth => bindActionCreators({ fetchPointRecords }, dispapth),
)(PointRecordList);

export default PointRecordListContainer;
