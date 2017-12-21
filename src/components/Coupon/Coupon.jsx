import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu, FilterBar, Loading } from 'components';
import CouponItem from './CouponItem';
import style from './coupon.css';

class Coupon extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
      }),
    }).isRequired,
    ddid: PropTypes.number.isRequired,
    fetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchCoupons: PropTypes.func.isRequired,
  }

  static filterItems = [
    { text: '未使用', to: '/coupon/unused' },
    { text: '已使用', to: '/coupon/used' },
    { text: '已过期', to: '/coupon/expired' },
  ]

  get isEmpty() {
    return this.props.items.length <= 0;
  }


  componentWillMount() {
    const { fetchCoupons, ddid, match } = this.props;
    fetchCoupons({ ddid, type: match.params.type });
  }

  componentWillUpdate(nextProps) {
    const { type } = nextProps.match.params;
    if (type !== this.props.match.params.type) {
      const { fetchCoupons, ddid } = this.props;
      fetchCoupons({ ddid, type });
    }
  }


  render() {
    const { fetching } = this.props;

    return (
      <div>
        <HeaderWithMenu title="优惠券" />

        <FilterBar filterItems={Coupon.filterItems} />

        <ul
          className={style.list}
          data-empty={(!fetching && this.isEmpty) ? '' : null}
        >
          {this.props.items.map(coupon => <CouponItem key={coupon.id} {...coupon} />)}
        </ul>

        <Loading active={fetching} />
      </div>
    );
  }
}

export default Coupon;
