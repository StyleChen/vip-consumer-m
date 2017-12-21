import { combineReducers } from 'redux';
import info from './info';
import records from './records/records';
import converts from './converts/converts';
import orders from './orders/orders';

export default combineReducers({
  info,
  records,
  converts,
  orders,
});
