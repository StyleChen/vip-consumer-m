import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './order-item.css';

class OrderItem extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.element.isRequired,
    compayName: PropTypes.string.isRequired, // 公司名称
    number: PropTypes.string.isRequired, // 订单号
    stateName: PropTypes.string.isRequired, // 订单状态
    items: PropTypes.arrayOf(PropTypes.shape({
      productid: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
      skuName: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })).isRequired, // 商品列表
    goToOrder: PropTypes.bool, // 存在时切路由，没有则跳真实地址
  }

  static defaultProps = {
    goToOrder: false,
  }

  static ITEM_URL = 'http://www.mengyunjie.com/m/item'

  handleLink = (event) => {
    const { history, goToOrder, number } = this.props;
    if (goToOrder) {
      event.preventDefault();
      history.push(`/order-detail/${number}`);
    }
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.header}>
          <svg className={style.icon}><use xlinkHref="#store-o" /></svg>
          <h2 className={style.title}>{this.props.compayName}</h2>
          <div className={style.state}>{this.props.stateName}</div>
        </div>

        <ul className={style.list}>
          {
            this.props.items.map(item => (
              <li key={item.productid} className={style.item}>
                <a
                  className={style.link}
                  href={`${OrderItem.ITEM_URL}/${item.productid}`}
                  onClick={this.handleLink}
                >
                  <img className={style.pic} src={item.image} alt={item.name} />
                  <div className={style.content}>
                    <h3 className={style.name}>{item.name}</h3>
                    <div className={style.detail}>{item.skuName}</div>
                  </div>
                  <div className={style.itemRight}>
                    <div className={style.price}>￥{item.price.toFixed(2)}</div>
                    <div className={style.count}>x{item.count}</div>
                  </div>
                </a>
              </li>
            ))
          }

        </ul>

        {this.props.children}
      </div>
    );
  }
}

export default OrderItem;
