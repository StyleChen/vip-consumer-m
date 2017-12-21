import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PointItem, Loading } from 'components';
import style from './point-order-list.css';

class PointOrderList extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchPointOrders: PropTypes.func.isRequired,
  }

  get isEmpty() {
    return this.props.items.length <= 0;
  }

  componentWillMount() {
    const { fetchPointOrders, ddid } = this.props;
    fetchPointOrders({ ddid });
  }

  render() {
    const { fetching, items } = this.props;

    return (
      <div>
        <ul
          className={style.list}
          data-empty={(!fetching && this.isEmpty) ? '' : null}
        >
          {
            items.map(item => (
              <li key={item.id} className={style.item}>
                <PointItem {...item} desc={`门店自提: ${item.company}`}>
                  <time className={style.goodsTime}>{item.time}</time>
                </PointItem>
                <div className={style.itemFooter}>
                  <div className={style.stat}>共{item.goods_num}件商品，合计: {item.money}积分</div>
                </div>
              </li>
            ))
          }
        </ul>

        <Loading active={fetching} />
      </div>
    );
  }
}

export default PointOrderList;
