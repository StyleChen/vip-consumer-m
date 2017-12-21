import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './coupon.css';

class Coupon extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    sendtime: PropTypes.string.isRequired,
    endtime: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    mctid: PropTypes.number.isRequired, // 优惠券类型，2是折扣，3是满减
    money: PropTypes.string.isRequired,
  }

  static defaultProps = {
    content: null,
  }

  static states = {
    1: '立即使用',
    2: '已使用',
    3: '已过期',
  }

  render() {
    const { title, content, sendtime, endtime, state, mctid, money } = this.props;

    return (
      <li>
        <Link className={style.item} to="#">
          <div className={style.itemLeft}>
            <h2 className={style.itemTitle}>{title}</h2>
            <ul className={style.desc}>
              {content ? (<li>满{content}元可用</li>) : null}
              <li>有效期: {sendtime} - {endtime}</li>
            </ul>
          </div>
          <div className={style.itemRight} data-type={mctid} data-state={state}>
            <svg className={style.icon}>
              <use xlinkHref="#store-o" />
            </svg>
            <div className={style.itemRightWrapper}>
              <div className={style.digi}>
                <span className={style.number}>{money}</span>
              </div>
              <div className={style.use}>{Coupon.states[state]}</div>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default Coupon;
