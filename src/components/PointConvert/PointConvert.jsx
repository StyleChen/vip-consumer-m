import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu, MainButton, LineContainer, LineItem, PointItem, Modal } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import style from './point-convert.css';

class PointConvert extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    ddid: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    pointStores: PropTypes.arrayOf(PropTypes.shape({
      company: PropTypes.string,
      sendddid: PropTypes.number,
    })).isRequired,
    info: PropTypes.shape({
      count: PropTypes.string, /* 总积分 */
    }).isRequired,
    pointDetail: PropTypes.shape({
      id: PropTypes.number,
      imgs: PropTypes.string, /* 暂时只有一张，后台返回一个字符串以后改成数组 */
      name: PropTypes.string,
      money: PropTypes.number,
      stock: PropTypes.number, /* 库存 */
      customer_num: PropTypes.number, /* 限购数量 */
      count: PropTypes.number, /* 已经购数量 */
    }).isRequired,
    fetchPointStores: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      storeListActive: false,
      selectedStore: null,
      count: 0,
      modalActive: false,
      code: { value: '', isValid: false },
      hasSentCode: false,
      timeRemain: 60,
    };
  }

  get currentStoreName() {
    const { selectedStore } = this.state;
    if (selectedStore) {
      const findCurrentStore = store => store.sendddid === selectedStore;
      return this.props.pointStores.find(findCurrentStore).company;
    }
    return '未选择';
  }

  get maxCount() {
    const { info, pointDetail } = this.props;

    const afford = Math.floor(+info.count / +pointDetail.money); // 用户积分足以兑换的最大数量
    const { stock, customer_num: limited } = pointDetail; // 库存数和限购数

    // 判断该商品是否无限购数量
    if (limited === null) {
      return Math.min(stock, afford);
    }

    const remainedCount = limited - pointDetail.count;
    if (remainedCount < 0) {
      return 0;
    }

    return Math.min(stock, afford, remainedCount);
  }

  get isBeyondMaxCount() {
    return this.state.count > this.maxCount - 1;
  }

  get hasCount() {
    return (this.state.count > 0);
  }

  get isCodeValid() {
    const { hasSentCode } = this.state;
    const codeValid = !hasSentCode;
    return codeValid;
  }

  get isConfirmValid() {
    const { code } = this.state;
    return code.isValid;
  }

  componentWillMount() {
    const { fetchPointStores, ddid } = this.props;
    fetchPointStores(ddid);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  toggleStore = () => {
    this.setState({
      storeListActive: !this.state.storeListActive,
    });
  }

  changeStore = sendddid => this.setState({ selectedStore: sendddid })

  changeCount = (change) => {
    // 结果不能小于0或大于可购买数
    this.setState({
      count: Math.min(
        Math.max(0, this.state.count + change),
        this.maxCount,
      ),
    });
  }

  showModal = () => {
    document.body.setAttribute('data-mask', '');
    this.setState({ modalActive: true });
  }

  hideModal = () => {
    document.body.removeAttribute('data-mask');
    this.setState({
      code: { value: '', isValid: false },
      modalActive: false,
    });
  }

  changeCode = ({ target }) => this.setState({
    code: {
      value: target.value,
      isValid: target.checkValidity(),
    },
  })

  sendCode = async () => {
    const { phone, params: { ddid } } = this.props;
    try {
      await ajax.post(apis.sendPointCode, { phone, ddid }, true);

      this.setState({ hasSentCode: true });

      this.timer = setInterval(() => {
        this.setState({ timeRemain: this.state.timeRemain - 1 });

        if (this.state.timeRemain <= 0) {
          clearInterval(this.timer);
          this.setState({
            hasSentCode: false,
            timeRemain: 60,
          });
        }
      }, 1000);
    } catch (error) {
      this.setState({ error: '服务器错误，请稍后重试' });
    }
  }

  convert = async () => {
    try {
      const { success } = await ajax.post(apis.addOrder, {
        ddid: this.props.ddid,
        phone: this.props.phone,
        eigid: this.props.pointDetail.id, // 产品id
        mobile_code: this.state.code.value,
        sendddid: 703,
        num: this.state.count,
      }, true);
      if (success) {
        document.body.removeAttribute('data-mask');
        this.props.history.push('point/order');
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: '服务器错误，请稍后重试' });
    }
  }

  render() {
    const { storeListActive, count, code } = this.state;
    const { pointDetail } = this.props;
    return (
      <div>
        <HeaderWithMenu title="积分兑换" />
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <LineContainer>
          <div>
            <LineItem label="配送方式" content="到店自提" />
            <div className={style.lineBox}>
              <LineItem label="门店选择" content="石狮市吉米呷呷生鲜连锁" />
              <ul className={storeListActive ? style.storeListActive : style.storeList}>
                {
                  this.props.pointStores.map(store => (
                    <li
                      key={store.sendddid}
                      className={style.storeListItem}
                      onClick={() => this.changeStore(store.sendddid)}
                    >{store.company}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </LineContainer>

        <section className={style.info}>
          <PointItem
            {...pointDetail}
            desc={pointDetail.customer_num === null ? '' : `限购${pointDetail.customer_num}个`}
          >
            <div className={style.itemPoint}>
              <strong className={style.itemPointNumber}>{pointDetail.money}</strong>积分
            </div>
          </PointItem>

          <div className={style.numbox}>
            <div>兑换数量</div>
            <div className={style.input}>
              <span
                className={style.minus}
                onClick={() => this.changeCount(-1)}
              >-</span>
              <input className={style.num} type="number" value={count} disabled />
              <span
                className={style.plus}
                onClick={() => this.changeCount(1)}
              >+</span>
            </div>
          </div>

          <div className={style.propmpt} hidden={!this.isBeyondMaxCount}>
              您仅能兑换{this.maxCount}件当前商品
          </div>
        </section>

        <MainButton text="立即兑换" action={this.convert} disabled={!this.hasCount} />


        <Modal active={this.state.modalActive} size="2">
          <div>
            <div data-modal-body>
              <h3>为了保证账号安全，请输入验证码</h3>

              <input className={style.phone} type="tel" value={this.props.phone} disabled />

              <div className={style.identify}>
                <input
                  type="text" placeholder="请输入验证码"
                  value={code.value}
                  pattern="\d{6}" required
                  onChange={this.changeCode}
                />
                <button
                  className={this.isCodeValid ? style.identifyBtnActive : style.identifyBtn}
                  type="button"
                  disabled={!this.isCodeValid}
                  onClick={this.sendCode}
                >
                  {this.state.hasSentCode ? `${this.state.timeRemain}秒后重发` : '发送验证码'}
                </button>
              </div>
            </div>

            <div data-modal-footer>
              <button type="button" onClick={this.hideModal}>取消</button>
              <button
                disabled={!this.isConfirmValid}
                type="button"
                onClick={this.convert}
                data-danger
              >确认</button>
            </div>
          </div>
        </Modal>

      </div>
    );
  }
}

export default PointConvert;

