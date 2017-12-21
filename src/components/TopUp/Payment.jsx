import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './top-up.css';

class Payment extends PureComponent {
  static propTypes = {
    ddid: PropTypes.string.isRequired,
    vipNumber: PropTypes.string.isRequired, // VIP卡号
    total_fee: PropTypes.number.isRequired, // 购买金额
    active: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
  }

  pay() {
    const { ddid, vipNumber, total_fee } = this.props;
    // eslint-disable-next-line
    location.href = `http://pay.chuangqikeji.com/pay/wx/vippay_WxAuth?number=${vipNumber}&duid=${localStorage.duid}&ddid=${ddid}&total_fee=${total_fee}`;
  }

  render() {
    return (
      <div className={this.props.active ? style.paymentActive : style.payment}>
        <div className={style.paymentInfo}>
          本次充值<em className={style.paymentMoney}>{this.props.total_fee}</em>元
        </div>
        <button className={style.btnWx} onClick={() => this.pay()}>微信支付</button>
        <button className={style.btnCancle} onClick={this.props.hide}>取消</button>
      </div>
    );
  }
}

export default Payment;
