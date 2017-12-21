import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu, FilterBar, Loading, MainButton, Modal } from 'components';
import { PAGE_SIZE } from 'redux/modules/orders/orders';
import { ajax } from 'utils';
import apis from 'apis';
import Order from './Order';
import style from './order-list.css';
import weixin from './weixin@2x.png';
import vip from './vip@2x.png';

class OrderList extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
      }),
    }).isRequired,
    ddid: PropTypes.number.isRequired,
    fetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    vipstate: PropTypes.number.isRequired,
  }

  static filterItems = [
    { text: '全部', to: '/order-list/all' },
    { text: '待付款', to: '/order-list/toPay' },
    { text: '待发货', to: '/order-list/toDeliver' },
    { text: '待收货', to: '/order-list/toReceive' },
    { text: '已完成', to: '/order-list/completed' },
  ]

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      modalActive: false,
      modalText: '',
      api: '',
      number: '',
      price: '',
      isShowVip: false,
      vippwd: '',
    };
  }

  get pageCount() {
    return Math.ceil(this.props.total / PAGE_SIZE);
  }

  get isEmpty() {
    return this.props.items.length <= 0;
  }

  get isLastPage() {
    return this.state.pageIndex >= this.pageCount;
  }

  componentWillMount() {
    const { fetchOrders, ddid, match } = this.props;
    this.setState(
      { pageIndex: 1 },
      () => fetchOrders({ ddid, type: match.params.type }),
    );
  }

  componentWillUpdate(nextProps) {
    const { type } = nextProps.match.params;
    if (type !== this.props.match.params.type) {
      const { fetchOrders, ddid } = this.props;
      this.setState(
        { pageIndex: 1 },
        () => fetchOrders({ ddid, type }),
      );
    }
  }

  fetchNextPage = () => {
    const { fetchOrders, ddid, match } = this.props;
    const pageIndex = this.state.pageIndex + 1;
    this.setState(
      { pageIndex },
      () => fetchOrders({ ddid, type: match.params.type, pageIndex }),
    );
  }

  getModal = (modalText, api, number, price) => {
    this.setState({
      modalText,
      api,
      number,
      price,
    });
  }

  showModal = () => {
    document.body.setAttribute('data-mask', '');
    this.setState({
      modalActive: true,
    });
  }

  closeModal = () => {
    document.body.removeAttribute('data-mask');
    this.setState({
      modalActive: false,
    });
  }

  handleOrder = async () => {
    const { number, api } = this.state;
    try {
      const { success, result } = await ajax.post(api, { number }, true);
      if (success && result) {
        this.closeModal();
        this.props.removeItem(number);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlePwd = (e) => {
    this.setState({ vippwd: e.target.value });
    if (e.target.value.length >= 6) {
      ajax.post(apis.VipCardPay, {
        number: this.state.number,
        ddid: sessionStorage.ddid || 48,
        password: e.target.value,
        money: this.state.price,
      }, true)
        .then((res) => {
          if (!res.success) {
            alert(res.msg);
          } else {
            location.reload();
          }
        })
        .catch((error) => { console.log(error); });
    }
  }

  render() {
    const { history, fetching, items } = this.props;

    return (
      <div>
        <HeaderWithMenu title="订单查询" />

        <FilterBar filterItems={OrderList.filterItems} />

        <ul
          className={style.list}
          data-empty={(!fetching && this.isEmpty) ? '' : null}
        >
          {
            items.map(order => <Order
              key={order.number} history={history}
              {...order}
              showModal={this.showModal}
              getModal={this.getModal}
            />)
          }
        </ul>

        {
          this.state.modalText !== '确定执行付款操作？' ?
            <Modal active={this.state.modalActive}>
              <div>
                <div data-modal-body>{this.state.modalText}</div>
                <div data-modal-footer>
                  <button onClick={this.closeModal}>取消</button>
                  <button onClick={this.handleOrder} data-danger>
                    确定</button>
                </div>
              </div>

            </Modal> :

            <div className={style.payWraper} hidden={!this.state.modalActive}>
              <div className={style.payText}>本次消费<span>{this.state.price}</span>元</div>
              <div
                className={`${style.payMode} ${style.payBtn}`}
                onClick={() => { location.href = `/m/o2o/order/WxAuth?number=${this.state.number}`; }}
              >
                <img src={weixin} alt="" />微信支付</div>
              <div className={`${style.payMode} ${style.payBtn}`} onClick={() => { this.setState({ isShowVip: true }); }} hidden={this.props.vipstate === 0}>
                <img src={vip} alt="" />会员卡支付</div>
              <div className={style.payBtn} onClick={this.closeModal}>取消</div>
            </div>
        }

        <div className={style.vipPay} hidden={!this.state.isShowVip}>
          <header className={style.vipPayHead}>请输入支付密码
            <svg
              className={style.iconClose}
              onClick={() => {
                this.closeModal();
                this.setState({ isShowVip: false });
              }}
            >
              <use xlinkHref="#cha1" />
            </svg>
          </header>
          <div className={style.vipPayBody}>
            ￥{this.state.price}
          </div>
          <footer className={style.vipPayFoot}>
            <ul>
              <li>{this.state.vippwd.split('')[0] ? '•' : null}</li>
              <li>{this.state.vippwd.split('')[1] ? '•' : null}</li>
              <li>{this.state.vippwd.split('')[2] ? '•' : null}</li>
              <li>{this.state.vippwd.split('')[3] ? '•' : null}</li>
              <li>{this.state.vippwd.split('')[4] ? '•' : null}</li>
              <li>{this.state.vippwd.split('')[5] ? '•' : null}</li>

            </ul>
            <div className={style.forget}><a href="#1">忘记密码</a></div>
            <input type="password" maxLength="6" ref="myInput" onChange={this.handlePwd} />
          </footer>
        </div>
        <Loading active={fetching} />

        <div hidden={fetching || this.isLastPage}>
          <MainButton text="加载更多" action={this.fetchNextPage} />
        </div>
      </div>
    );
  }
}

export default OrderList;
