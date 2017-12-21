import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OrderDetail } from 'components';
import { fetchOrderDetail } from 'redux/modules/order-detail';

const OrderDetailContainer = connect(
  ({ orderDetail: { data, traces }, card: { vipstate } }) => ({ data, traces, vipstate }),
  dispapth => bindActionCreators({ fetchOrderDetail }, dispapth),
)(OrderDetail);

export default OrderDetailContainer;
