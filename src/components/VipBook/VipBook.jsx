import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputWithLabel, MainButton, LineItem, Modal, Loading } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import style from './vip-book.css';

class VipBook extends PureComponent {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    ddid: PropTypes.number.isRequired,
    vipCards: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchVipCards: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      number: 0,
      keyword: '',
      phone: { value: '', isValid: false },
      name: { value: '', isValid: false },
      show: false,
      error: '',
      detail: {},
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.submit = this.submit.bind(this);
  }

  get isAllValid() {
    const { phone, name } = this.state;
    return name.isValid && phone.isValid;
  }

  componentWillMount() {
    const { ddid, fetchVipCards } = this.props;
    ajax.post(apis.bookDetail, { ddid: this.props.ddid }, true)
      .then((res) => {
        if (res.result) {
          this.setState({ detail: res.result, step: 3 });
        } else {
          fetchVipCards(ddid);
        }
      });
  }

  changeNumber(e) {
    this.setState({ number: e.target.innerText });
  }

  changeInputValue = ({ target }, prop) => {
    this.setState({
      [prop]: {
        value: target.value,
        isValid: target.checkValidity(),
      },
    });
  }

  async submit() {
    const { success } = await ajax.post(apis.bookAdd, {
      ddid: this.props.ddid,
      number: this.state.number,
      phone: this.state.phone.value,
      name: this.state.name.value,
      sendddid: this.props.ddid,
    }, true);
    if (success) {
      this.closeModal();
      const { result } = await ajax.post(apis.bookDetail, { ddid: this.props.ddid }, true);
      await this.setState({ detail: result });
      this.setState({ step: 3 });
    } else {
      this.setState({ error: '格式错误' });
    }
  }

  showModal() {
    document.body.setAttribute('data-mask', '');
    this.setState({
      show: true,
    });
  }

  closeModal() {
    document.body.removeAttribute('data-mask');
    this.setState({
      show: false,
    });
  }
  render() {
    const { step, show, number, keyword } = this.state;
    const { ddid, fetchVipCards, vipCards, fetching } = this.props;
    return (
      <div>
        {/* 第一页 */}
        <div className={style.pageWrapper} hidden={step !== 1}>
          <div className={style.bookHeader}>
            <div className={style.searchWrapper}>
              <svg className={style.icon} >
                <use xlinkHref="#search" />
              </svg>
              <input type="search" className={style.searchInput} placeholder="查找号码" form="form" onChange={(e) => { this.setState({ keyword: e.target.value }); }} />
            </div>
            <div className={style.search} onClick={() => { fetchVipCards(ddid, keyword); }}>搜索</div>
          </div>
          <section className={style.result} hidden={fetching}>
            <ul className={style.numberList}>
              {
                vipCards.map(item => (
                  // eslint-disable-next-line
                  <li className={`${style.phoneNumber}${number == item.number ? ` ${style.selected}` : ''}`} key={item.number} onClick={this.changeNumber}>{item.number}</li>
                ))
              }
            </ul>
          </section>

          <Loading active={fetching} />

          <footer className={style.footBtn}>
            <button onClick={() => { fetchVipCards(ddid, keyword); }}>换一组</button>
            <button onClick={() => { this.setState({ step: 2 }); }}>下一步</button>
          </footer>
        </div>
        {/* 第二页 */}
        <div className={style.inputWrapper} hidden={step !== 2}>
          <InputWithLabel
            label="会员卡号"
            type="text"
            value={this.state.number}
            readonly
          />
          <InputWithLabel
            label="您的名字"
            type="text"
            placeholder="输入您的名字"
            value={this.state.name.value}
            required
            onChange={event => this.changeInputValue(event, 'name')}
          />
          <InputWithLabel
            label="手机号码"
            type="text"
            placeholder="输入您的手机号码"
            value={this.state.phone.value}
            pattern="^1[53847]\d{9}$"
            required
            onChange={event => this.changeInputValue(event, 'phone')}
          />
          <InputWithLabel
            label="预约门店"
            type="text"
            value="吉米呷呷石狮德辉店"
          />
          <div className={style.error} hidden={!this.state.error}>{this.state.error}</div>

          <MainButton
            disabled={!this.isAllValid}
            text="下一步"
            action={() => {
              this.showModal();
            }}
          />

          <div className={style.helpfulHints}>友情提示
            <p>1、预订成功后我们将为您保留会员卡72小时，请尽快到门店办理会员卡，逾期将不予保留；</p>
            <p>2、在门店办理会员卡时，需要最低充值100人民币，才可以免费办理会员卡，充值金额可在吉米呷呷门店及网上商城任意消费。</p>
          </div>

          <Modal active={show}>
            <div>
              <div data-modal-body>是否确认预订该卡号？</div>
              <div data-modal-footer>
                <button onClick={this.closeModal}>取消</button>
                <button
                  data-danger
                  onClick={this.submit}
                >
                  确认</button>
              </div>
            </div>
          </Modal>
        </div>

        {/* 第三页 */}
        <div hidden={step !== 3}>
          <div className={style.bookDetail}>
            <h2 className={style.bigTitle}>
              <svg className={style.icon}>
                <use xlinkHref="#ok" />
              </svg>预订成功</h2>
            <div className={style.info}>
              <LineItem label="会员卡号" content={this.state.detail.number} />
              <LineItem label="您的名字" content={this.state.detail.name} />
              <LineItem label="手机号码" content={this.state.detail.phone} />
              <LineItem label="预约门店" content={this.state.detail.compay_name} />
              <LineItem label="预定时间" content={this.state.detail.time} />
            </div>
            <div className={style.helpfulHints}>友情提示
              <p>1、预订成功后我们将为您保留会员卡72小时，请尽快到门店办理会员卡，逾期将不予保留；</p>
              <p>2、在门店办理会员卡时，需要最低充值100人民币，才可以免费办理会员卡，充值金额可在吉米呷呷门店及网上商城任意消费。</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VipBook;
