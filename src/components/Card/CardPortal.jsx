import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LineContainer, LineItem } from 'components';
import style from './card.css';

function getddid(url) {
  return url.split('/')[url.split('/').length - 1];
}
sessionStorage.setItem('platId', getddid(location.pathname));

class CardPortal extends PureComponent {
  static propTypes = {
    // phone: PropTypes.string.isRequired,
    vipstate: PropTypes.number.isRequired,
  }
  static items = [
    [
      { icon: 'user', text: '我的资料', to: '/user', color: 'blue' },
      { icon: 'star2', text: '我的收藏', to: '/collection', color: 'yellow' },
    ],
    [
      { icon: 'order', text: '订单查询', to: '/order-list/all', color: 'orange' },
      { icon: 'coins', text: '积分', to: '/point/record', color: 'yellow' },
    ],
    [
      { icon: 'store-portal', text: '门店', to: '/store', color: 'purple' },
      { icon: 'card', text: '挂失补卡', to: '/loss', color: 'green' },
      { icon: 'vip', text: '预订会员卡', to: '/vip-book', color: 'orange' },
      { icon: 'heart', text: '吉米关怀', to: 'http://www.mengyunjie.com/m/o2oshop/guanhuai?ddid=703', color: 'theme' },
    ],
    [
      { icon: 'eat', text: '企业订餐', to: `http://www.mengyunjie.com/erp/eat/${getddid(location.pathname)}/company/app`, color: 'green' },
      { icon: 'eat-center', text: '吉米食堂', to: `http://www.mengyunjie.com/erp/eat/${getddid(location.pathname)}/center/app`, color: 'yellow' },
      { icon: 'talk', text: '联系客服', to: 'javascript:;', color: 'blue' }, //eslint-disable-line
    ],
  ]

  static items2 = [
    [
      { icon: 'user', text: '我的资料', to: '/user', color: 'blue' },
      { icon: 'star2', text: '我的收藏', to: '/collection', color: 'yellow' },
    ],
    [
      { icon: 'order', text: '订单查询', to: '/order-list/all', color: 'orange' },
      { icon: 'coins', text: '积分', to: '/point/record', color: 'yellow' },
    ],
    [
      { icon: 'store-portal', text: '门店', to: '/store', color: 'purple' },
      { icon: 'vip', text: '预订会员卡', to: '/vip-book', color: 'orange' },
      { icon: 'heart', text: '吉米关怀', to: 'http://www.mengyunjie.com/m/o2oshop/guanhuai?ddid=703', color: 'theme' },
    ],
    [
      { icon: 'eat', text: '企业订餐', to: `http://www.mengyunjie.com/erp/eat/${getddid(location.pathname)}/company/app`, color: 'green' },
      { icon: 'eat-center', text: '吉米食堂', to: `http://www.mengyunjie.com/erp/eat/${getddid(location.pathname)}/center/app`, color: 'yellow' },
      { icon: 'talk', text: '联系客服', to: 'javascript:;', color: 'blue' }, //eslint-disable-line
    ],
  ]

  constructor(props) {
    super(props);
    this.state = {
      serviceActive: false,
    };
  }

  toggleService = (active) => {
    if (active) {
      document.body.setAttribute('data-mask', '');
    } else {
      document.body.removeAttribute('data-mask');
    }
    this.setState({ serviceActive: active });
  }

  render() {
    // if (location.search.includes('hotel')) {
    //   return (
    //     <section>
    //       <ul className={style.list}>
    //         <li key="/point/record" className={style.item}>
    //           <Link className={style.itemLink} to="/point/record">
    //             <svg className={style.icon} data-index="1">
    //               <use xlinkHref={'#coins'} />
    //             </svg>
    //             <div className={style.itemText}>积分</div>
    //           </Link>
    //         </li>
    //         <li className={style.item}>
    //           {/* eslint-disable jsx-a11y/no-static-element-interactions */}
    //           <a className={style.itemLink} href={`http://www.mengyunjie.com/m/hotel/orderlist?ddid=${getddid(location.pathname)}`}>
    //             <svg className={style.icon} data-index="10">
    //               <use xlinkHref="#order" />
    //             </svg>
    //             <div className={style.itemText}>酒店订单</div>
    //           </a >
    //         </li >

    //         <li className={style.item}>
    //           {/* eslint-disable jsx-a11y/no-static-element-interactions */}
    //           <a className={style.itemLink} onClick={() => this.toggleService(true)}>
    //             <svg className={style.icon} data-index="9">
    //               <use xlinkHref="#talk" />
    //             </svg>
    //             <div className={style.itemText}>联系客服</div>
    //           </a>
    //         </li>
    //       </ul>
    //       <div className={this.state.serviceActive ? style.serviceActive : style.service}>
    //         <a className={style.servicePhone} href={`tel:${this.props.phone}`}>电话: {this.props.phone}</a>
    //         <button className={style.serviceBtn} onClick={() => this.toggleService(false)}>
    //           取消</button>
    //       </div>
    //     </section >
    //   );
    // }
    return (
      <section>
        <div className={style.list}>
          {this.props.vipstate === 1 ?
            CardPortal.items.map(itemGroup => (
              <LineContainer>
                {itemGroup.map((item) => {
                  if (!'吉米关怀企业订餐吉米食堂联系客服'.includes(item.text)) {
                    return (<Link to={item.to} className={style.item}>
                      <LineItem
                        label={item.text} arrow
                        icon={<svg className={style.icon} data-color={item.color} data-id={item.icon}>
                          <use xlinkHref={`#${item.icon}`} />
                        </svg>}
                      />
                    </Link>);
                  }
                  return (
                    <a href={item.to} className={style.item} onClick={item.text === '联系客服' ? () => { this.toggleService(true); } : null}>
                      <LineItem
                        label={item.text} arrow
                        icon={<svg className={style.icon} data-color={item.color} data-id={item.icon}>
                          <use xlinkHref={`#${item.icon}`} />
                        </svg>}
                      />
                    </a>
                  );
                })}
              </LineContainer>
            )) :
            CardPortal.items2.map(itemGroup => (
              <LineContainer>
                {itemGroup.map((item) => {
                  if (!'吉米关怀企业订餐吉米食堂联系客服'.includes(item.text)) {
                    return (<Link to={item.to} className={style.item}>
                      <LineItem
                        label={item.text} arrow
                        icon={<svg className={style.icon} data-color={item.color} data-id={item.icon}>
                          <use xlinkHref={`#${item.icon}`} />
                        </svg>}
                      />
                    </Link>);
                  }
                  return (
                    <a href={item.to} className={style.item} onClick={item.text === '联系客服' ? () => { this.toggleService(true); } : null}>
                      <LineItem
                        label={item.text} arrow
                        icon={<svg className={style.icon} data-color={item.color} data-id={item.icon}>
                          <use xlinkHref={`#${item.icon}`} />
                        </svg>}
                      />
                    </a>
                  );
                })}
              </LineContainer>
            ))
          }

        </div >
        {/* <a href="/api/m/login">111</a> */}
        <div className={this.state.serviceActive ? style.serviceActive : style.service}>
          <a className={style.servicePhone} href="tel:059583029922">电话: 059583029922</a>
          <button className={style.serviceBtn} onClick={() => this.toggleService(false)}>取消</button>
        </div>
      </section >
    );
  }
}

export default CardPortal;

