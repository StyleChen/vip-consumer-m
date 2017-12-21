import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MainButton } from 'components';
import Payment from './Payment';
import style from './top-up.css';
// import banner from './banner.png';

class TopUp extends PureComponent {
  static propTypes = {
    ddid: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    detail: PropTypes.Object,
    fetchTopUp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      inputMoney: '',
      paymentActive: false,
    };
  }

  get hasMoneyInput() {
    return (this.state.inputMoney !== '');
  }

  get hasMoneySelected() {
    return (this.state.activeIndex != null);
  }

  // 获取购买金额
  get totalFee() {
    const { activeIndex, inputMoney } = this.state;
    const { list } = this.props;

    if (this.hasMoneyInput) {
      return +inputMoney;
    } else if (this.hasMoneySelected) {
      return list[activeIndex].money;
    }
    return 0;
  }

  // 获取赠送金额
  // get giveFee() {
  //   const { activeIndex, inputMoney } = this.state;
  //   const { list, percent } = this.props;

  //   if (this.hasMoneyInput) {
  //     return +(inputMoney * (percent / 100)).toFixed(2);
  //   } else if (this.hasMoneySelected) {
  //     return list[activeIndex].givemoney;
  //   }
  //   return 0;
  // }

  get money() {
    return this.giveFee + this.totalFee;
  }

  get isLessThanMin() {
    const { moneymin } = this.props.detail;
    return this.money < moneymin;
  }

  get isMoreThanMax() {
    const { moneymax } = this.props.detail;
    return this.money > moneymax;
  }

  get warningText() {
    if (this.isLessThanMin) {
      return `单笔最低充值<em>${this.props.detail.moneymin}</em>元`;
    }
    if (this.isMoreThanMax) {
      return `单笔最高充值<em>${this.props.detail.moneymax}</em>元`;
    }
    return '';
  }

  get isBtnDisabled() {
    return (this.isLessThanMin || this.isMoreThanMax);
  }

  componentWillMount() {
    const { ddid, fetchTopUp } = this.props;
    fetchTopUp(ddid);
  }

  isActive = index => index === this.state.activeIndex;

  clearInput = () => this.setState({
    inputMoney: '',
  })

  changeActive = index => this.setState({
    activeIndex: (index === this.state.activeIndex) ? null : index,
    inputMoney: '',
  })

  changeInput = ({ target }) => {
    this.setState({
      activeIndex: null,
      inputMoney: target.value,
    });
  }

  showPayment = () => {
    document.body.setAttribute('data-mask', '');
    this.setState({ paymentActive: true });
  }

  hidePayment = () => {
    document.body.removeAttribute('data-mask');
    this.setState({ paymentActive: false });
  }

  render() {
    const { ddid, number, list } = this.props;

    return (
      <div>
        {/* <HeaderWithMenu title="在线充值" />

        <div className={style.banner}>
          <img className={style.bannerImage} src={banner} alt="替换为横幅信息" />
        </div> */}

        <div className={style.money}>
          {/* <div className={style.inputBox}>
            <input
              className={style.moneyInput}
              type="number"
              placeholder="手动输入充值金额"
              value={this.state.inputMoney}
              min={moneymin}
              max={moneymax}
              onChange={this.changeInput}
            />
            <svg
              className={style.inputSvg}
              hidden={!this.hasMoneyInput}
              onClick={this.clearInput}
            >
              <use xlinkHref="#delete" />
            </svg>
          </div>
          <small
            className={style.moneyText}
            dangerouslySetInnerHTML={{ __html: this.warningText }}
          /> */}

          <ul className={style.moneySelect}>
            {
              list.map(({ money, givemoney }, index) => (
                /* eslint-disable jsx-a11y/no-static-element-interactions */
                <li
                  key={money}
                  className={this.isActive(index) ? style.moneyItemActive : style.moneyItem}
                  onClick={() => this.changeActive(index)}
                >
                  <div className={style.amount}>{money}元</div>
                  <div className={style.perk} hidden={!givemoney}>赠送: {givemoney}元</div>
                </li>
              ))
            }
          </ul>
        </div>

        <MainButton
          disabled={this.state.activeIndex === null}
          text="立即充值"
          action={this.showPayment}
        />

        <small className={style.agreement}>点击立即充值，即表示您已同意<a>《充值协议》</a></small>

        <Payment
          {...({
            ddid,
            vipNumber: number, // VIP卡号
            total_fee: this.totalFee, // 购买金额
            give_fee: this.giveFee, // 赠送金额
          })}
          active={this.state.paymentActive}
          hide={this.hidePayment}
        />
      </div>
    );
  }
}

export default TopUp;
