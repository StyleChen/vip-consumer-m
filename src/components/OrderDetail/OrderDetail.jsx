/* eslint-disable no-nested-ternary, no-param-reassign */
/* globals BMap, BMAP_ANIMATION_BOUNCE */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HeaderWithMenu, BillHeader, OrderItem, LightButton, Modal } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import style from './order-detail.css';
import weixin from './weixin@2x.png';
import vip from './vip@2x.png';

class OrderDetail extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        orderNumber: PropTypes.string,
      }),
    }).isRequired,
    data: PropTypes.shape({
      date: PropTypes.string,
      deliveryPrice: PropTypes.number,
      logisticcode: PropTypes.string,
      number: PropTypes.string,
      payment: PropTypes.string,
      receiveAddress: PropTypes.string,
      receiveName: PropTypes.string,
      receivePhone: PropTypes.string,
      sendmode: PropTypes.number,
      shippercode: PropTypes.string,
      state: PropTypes.number,
      stateName: PropTypes.string,
      totalFee: PropTypes.number,
      items: PropTypes.array,
    }).isRequired,
    traces: PropTypes.arrayOf(PropTypes.shape({
      AcceptStation: PropTypes.string,
      AcceptTime: PropTypes.string,
    })).isRequired,
    fetchOrderDetail: PropTypes.func.isRequired,
    vipstate: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      modalText: '',
      api: '',
      number: '',
      price: '',
      isShowVip: false,
      vippwd: '',
    };
  }

  get logisticsInfo() {
    const { traces } = this.props;
    const tracesLength = traces.length;
    const lastTraces = traces[tracesLength - 1];

    const acceptStation = tracesLength > 0 ? lastTraces.AcceptStation : '暂无物流信息';
    const acceptTime = tracesLength > 0 ? lastTraces.AcceptTime : '';
    return { acceptStation, acceptTime };
  }

  get goodsPrice() {
    const { data: { items } } = this.props;
    return items[0] ? (items[0].count * items[0].price).toFixed(2) : '0.00';
  }

  get freight() {
    const { data: { deliveryPrice } } = this.props;
    return deliveryPrice ? deliveryPrice.toFixed(2) : '0.00';
  }

  get factPrice() {
    const { data: { totalFee } } = this.props;
    return totalFee ? totalFee.toFixed(2) : '0.00';
  }

  get isHidden() {
    const { data } = this.props;
    return data.sendmode === 1 || data.state === 9;
  }

  componentWillMount() {
    const { fetchOrderDetail, match } = this.props;
    fetchOrderDetail(match.params.orderNumber);
    ajax.post(apis.place, { number: this.props.match.params.orderNumber }, true)
      .then((res) => { this.setState({ logis: res.result }); });
  }

  componentDidUpdate() {
    const { originX, originY, targetX, targetY, addrX, addrY } = this.state.logis;
    const map = new BMap.Map(this.map);
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);

    const myP1 = new BMap.Point(originX, originY);    // 起点
    const myP2 = new BMap.Point(targetX, targetY);    // 终点
    const myP3 = new BMap.Point(addrX, addrY);    // 快递员位置
    const myIcon = new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/Mario.png', new BMap.Size(32, 70), {
      imageOffset: new BMap.Size(0, 0),    // 图片的偏移量。为了是图片底部中心对准坐标点。
    });
    const driving2 = new BMap.DrivingRoute(map, { renderOptions: { map, autoViewport: true } });    // 驾车实例
    driving2.search(myP1, myP2);    // 显示一条公交线路
    const marker = new BMap.Marker(myP3, { icon: myIcon });
    map.addOverlay(marker);              // 将标注添加到地图中
    // eslint-disable-next-line
    const top_left_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL });
    map.addControl(top_left_navigation);
  }

  static orderButtons = [
    { text: '取消订单', api: apis.cancelOrder, state: 0 },
    { text: '付款', theme: true, state: 0 },
    { text: '确认自提', theme: true, api: apis.confirmOrder, state: 2, sendmode: 1 },
    { text: '查看配送', state: 2, sendmode: 4 },
    { text: '确认收货', theme: true, api: apis.confirmOrder, state: 2, sendmode: 4 },
  ]

  getOrderButtons = (state, sendmode) => (
    OrderDetail.orderButtons.filter((button) => {
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
      this.showModal();
      this.getModal(`确定执行${text}操作？`, api);
    }
  }

  goToLogistics = (to) => {
    const { history, data } = this.props;
    history.push(`${to}/${data.shippercode}/${data.logisticcode}`);
  }

  handleOrder = async () => {
    const { api } = this.state;

    try {
      const { orderNumber: number } = this.props.match.params;
      const { success } = await ajax.post(api, { number }, true);
      if (success) {
        const { fetchOrderDetail, match } = this.props;
        fetchOrderDetail(match.params.orderNumber);
        this.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlePwd = (e) => {
    this.setState({ vippwd: e.target.value });
    if (e.target.value.length >= 6) {
      ajax.post(apis.VipCardPay, {
        number: this.props.data.number,
        ddid: sessionStorage.ddid || 48,
        password: e.target.value,
        money: this.props.data.totalFee,
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

  getModal = (modalText, api) => {
    this.setState({
      modalText,
      api,
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

  render() {
    const { data, traces } = this.props;

    return (
      <div className={style.orderDetail}>
        <HeaderWithMenu title="订单详情" />

        <BillHeader
          billState={data.stateName}
          billItems={[
            { label: '交易单号', content: data.number },
            { label: '下单时间', content: data.date },
          ]}
        />

        <Link
          className={style.container}
          to={`/logistics/${data.shippercode}/${data.logisticcode}`}
          hidden={this.isHidden}
        >
          <svg className={style.icon}><use xlinkHref="#truck" /></svg>
          <div className={style.content}>
            <div className={style.title}>
              {
                this.logisticsInfo.acceptStation
              }
            </div>
            <time hidden={traces.length === 0}>{this.logisticsInfo.acceptTime}</time>
          </div>
          <svg className={style.arrow}><use xlinkHref="#arrow-right" /></svg>
        </Link>

        <div className={style.container} hidden={this.isHidden}>
          <svg className={style.icon}><use xlinkHref="#geo" /></svg>
          <div className={style.content}>
            <div className={style.title}>姓名: {data.receiveName}</div>
            <div>电话: {data.receivePhone}</div>
            <div>地址: {data.receiveAddress}</div>
          </div>
        </div>


        <OrderItem {...data}>
          <ul className={style.orderFooter}>
            <li className={style.orderFooterItem}>
              <span className={style.orderFooterLabel}>商品总价</span>
              <span>￥{this.goodsPrice}</span>
            </li>
            <li className={style.orderFooterItem}>
              <span className={style.orderFooterLabel}>运费</span>
              <span>￥{this.freight}</span>
            </li>
            <li className={style.orderFooterItem}>
              <span className={style.orderFooterLabel}>实付款（{data.payment}）</span>
              <span className={style.orderFooterTotal}>
                ￥{this.factPrice}
              </span>
            </li>
          </ul>
        </OrderItem>

        {
          this.state.modalText === '确定执行付款操作？' ?
            <div className={style.payWraper} hidden={!this.state.modalActive}>
              <div className={style.payText}>本次消费<span>{data.totalFee}</span>元</div>
              <div
                className={`${style.payMode} ${style.payBtn}`}
                onClick={() => { location.href = `/m/o2o/order/WxAuth?number=${this.state.number}`; }}
              >
                <img src={weixin} alt="" />微信支付</div>
              <div className={`${style.payMode} ${style.payBtn}`} onClick={() => { this.setState({ isShowVip: true }); }} hidden={this.props.vipstate === 0}>
                <img src={vip} alt="" />会员卡支付</div>
              <div className={style.payBtn} onClick={this.closeModal}>取消</div>
            </div> :
            this.state.modalText === '确定执行查看配送操作？' ?
              <div className={style.logistics} hidden={!this.state.modalActive}>
                <h2 className={style.logTitle}>
                  订单<span className={style.logNumber}>{data.number}</span>物流跟踪
                  <svg className={style.iconClose} onClick={this.closeModal}>
                    <use xlinkHref="#cha1" />
                  </svg>
                </h2>
                <div className={style.allmap} ref={(ref) => { this.map = ref; }} />
              </div> :
              <Modal active={this.state.modalActive}>
                <div>
                  <div data-modal-body>{this.state.modalText}</div>
                  <div data-modal-footer>
                    <button onClick={this.closeModal}>取消</button>
                    <button onClick={this.handleOrder} data-danger>
                      确定</button>
                  </div>
                </div>
              </Modal>

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
            ￥{data.totalFee}
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

        <footer className={style.footer}>
          {
            this.getOrderButtons(data.state, data.sendmode).map(button => (
              <LightButton
                key={button.text}
                text={button.text}
                action={() => this.handleClick(button)}
                theme={button.theme}
              />
            ))
          }
        </footer>
      </div>
    );
  }
}

export default OrderDetail;

