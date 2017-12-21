import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Bill } from 'components';
import { fetchBills } from 'redux/modules/bills/bills';

const BillContainer = connect(
  ({
    card: { ddid },
    global: { fetching },
    bills,
  }) => ({ ddid, fetching, ...bills }),
  dispatch => bindActionCreators({ fetchBills }, dispatch),
)(Bill);

export default BillContainer;
