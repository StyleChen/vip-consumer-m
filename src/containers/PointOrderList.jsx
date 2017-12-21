import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PointOrderList } from 'components';
import { fetchPointOrders } from 'redux/modules/point/orders/orders';

const PointOrderListContainer = connect(
  ({
    card: { ddid },
    global: { fetching },
    point,
  }) => ({ ddid, fetching, ...point.orders }),
  dispapth => bindActionCreators({ fetchPointOrders }, dispapth),
)(PointOrderList);

export default PointOrderListContainer;
