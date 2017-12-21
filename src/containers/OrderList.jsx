import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OrderList } from 'components';
import { fetchOrders } from 'redux/modules/orders/orders';
import { removeItem } from 'redux/modules/orders/items';

const OrderListContainer = connect(
  ({
    card: { ddid, vipstate },
    global: { fetching },
    orders,
}) => ({ ddid, vipstate, fetching, ...orders }),
  dispatch => bindActionCreators({ fetchOrders, removeItem }, dispatch),
)(OrderList);

export default OrderListContainer;
