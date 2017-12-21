import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './card.css';

class Card extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    // cz_money: PropTypes.number.isRequired,
    // give_money: PropTypes.number.isRequired,
    totalfee: PropTypes.number.isRequired,
    issee: PropTypes.number.isRequired,  // 1--可见 0--不可见
    changeMoneyShowState: PropTypes.func.isRequired,
  }

  getCardIndex = () => (this.props.ddid % 3) + 1

  fixedMoney = val => (val ? val.toFixed(2) : '0.00');

  get isShowMoney() {
    return this.props.issee === 1;
  }

  get moneyText() {
    const money = this.fixedMoney(this.props.totalfee);
    if (this.isShowMoney) {
      return money;
    }
    // return money.replace(/\d/g, '*');
    return '****';  // 产品要求这么改
  }

  get moneyIcon() {
    return (this.isShowMoney ? 'eye' : 'eye-closed');
  }

  handleMoneyShowState = () => {
    const { ddid, issee } = this.props;
    this.props.changeMoneyShowState(ddid, issee);
  }

  render() {
    const { logo, company, number, ddid } = this.props;

    return (
      <section className={style.card} data-index={this.getCardIndex()}>
        <div className={style.cardTop}>
          <img className={style.logo} src={logo} alt={company} />
          <div className={style.info}>
            <h1 className={style.name}>{company}</h1>
            <div className={style.number}>NO. {number}</div>
          </div>
          <Link className={style.pay} to={`/card/${ddid}/scan`}>扫码支付</Link>
        </div>

        <div className={style.cardBottom}>
          <div className={style.money}>
            <div>
              余额: ￥<strong className={style.balance}>{this.moneyText}</strong>
            </div>
            {/* <div className={style.moneyDetail}>
            充值余额: {this.fixedMoney(cz_money)}, 赠送余额: {this.fixedMoney(give_money)}
            </div> */}
          </div>
          <svg
            className={style.eyes}
            onClick={this.handleMoneyShowState}
          ><use xlinkHref={`#${this.moneyIcon}`} /></svg>
        </div>

        <div className={style.cardFooter}>
          <Link to="/topup">
            <svg className={style.icon} data-color="orange" data-type="顶栏">
              <use xlinkHref="#topup" />
            </svg>在线充值
          </Link>
          <Link to="/bill/all">
            <svg className={style.icon} data-color="yellow" data-type="顶栏">
              <use xlinkHref="#billing" />
            </svg>账单查询
          </Link>
        </div>
      </section>
    );
  }
}

export default Card;
