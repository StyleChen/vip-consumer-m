import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Coupon } from 'components';
import { fetchCoupons } from 'redux/modules/coupons/coupons';


const CouponContainer = connect(
  ({
    card: { ddid },
    global: { fetching },
    coupons,
  }) => ({ ddid, fetching, ...coupons }),
  dispatch => bindActionCreators({ fetchCoupons }, dispatch),
)(Coupon);

export default CouponContainer;
