/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OrderItem, LightButton } from 'components';
import apis from 'apis';
import style from './order-list.css';

class Order extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    number: PropTypes.string.isRequired,
    logisticcode: PropTypes.string.isRequired, // 运单号
    shippercode: PropTypes.string.isRequired, // 快递公司
    deliveryPrice: PropTypes.number.isRequired,
    totalFee: PropTypes.number.isRequired,
    sendmode: PropTypes.number.isRequired, // 配送方式（1-自提，2-配送）
    state: PropTypes.number.isRequired, // 订单状态（0-待付款， 1-待发货， 2-待收货， 3-已完成）
    showModal: PropTypes.func.isRequired,
    getModal: PropTypes.func.isRequired,
  }

  static orderButtons = [
    { text: '取消订单', api: apis.cancelOrder, state: 0 },
    { text: '付款', theme: true, state: 0 },
    { text: '确认自提', theme: true, api: apis.confirmOrder, state: 2, sendmode: 1 },
    { text: '查看配送', state: 2, sendmode: 2, to: '/logistics' },
    { text: '确认收货', theme: true, api: apis.confirmOrder, state: 2, sendmode: 2 },
  ]

  getOrderButtons = (state, sendmode) => (
    Order.orderButtons.filter((button) => {
      const isSameState = (button.state === state);
      const isSameSendmode = (button.sendmode == null) || (button.sendmode === sendmode);
      return (isSameState && isSameSendmode);
    })
  )

  handleClick = async ({ url, to, api, text }) => {
    if (url) {
      location.href = url;
    } else if (to) {
      this.goToLogistics(to);
    } else {
      const { showModal, getModal, number } = this.props;
      showModal();
      getModal(`确定执行${text}操作？`, api, number, this.props.totalFee);
    }
  }

  goToLogistics = (to) => {
    const { history, logisticcode, shippercode } = this.props;
    history.push(`${to}/${shippercode}/${logisticcode}`);
  }

  render() {
    const { totalFee, deliveryPrice, state, sendmode } = this.props;

    return (
      <li className={style.item}>
        <OrderItem {...this.props} goToOrder>
          <div className={style.orderFooter}>
            <div className={style.price}>
              共1件商品，合计：￥{totalFee.toFixed(2)}（含运费￥{deliveryPrice.toFixed(2)}）
            </div>
            <div className={style.btns}>
              {
                this.getOrderButtons(state, sendmode).map(button => (
                  <LightButton
                    key={button.text}
                    text={button.text}
                    action={() => this.handleClick(button)}
                    theme={button.theme}
                  />
                ))
              }
            </div>
          </div>
        </OrderItem>
      </li>
    );
  }
}

export default Order;
