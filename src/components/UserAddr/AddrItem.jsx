import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './user-addr.css';

class AddrItem extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    province_name: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
    district_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    setAddrDefault: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    editAddr: PropTypes.func.isRequired,
  }

  handleClick =(event) => {
    event.preventDefault();
    const { editAddr, id } = this.props;
    editAddr(id);
  }

  render() {
    /* eslint-disable camelcase */
    const {
      name,
      mobile,
      province_name,
      city_name,
      district_name,
      address,
      isDefault,
      id,
    } = this.props;

    return (
      <li className={style.item} >
        <div className={style.itemInfo}>
          <div className={style.title}>{name} {mobile}</div>
          <address className={style.addr}>
            {province_name}{city_name}{district_name}{address}
          </address>
        </div>

        <div className={style.itemFooter}>
          <button className={style.itemFooterBtn} type="button" onClick={() => this.props.setAddrDefault(id)}>
            {
              isDefault ?
                <svg className={style.iconTheme}><use xlinkHref="#ok" /></svg> :
                <i className={style.icon} />
            }默认地址
          </button>
          <div className={style.itemFooterRight}>
            <a className={style.itemFooterBtn} href="" onClick={this.handleClick}>
              <svg className={style.icon}>
                <use xlinkHref="images/icons.svg#edit" />
              </svg>编辑
            </a>
            <button className={style.itemFooterBtn} type="button" onClick={() => this.props.showModal(id)}>
              <svg className={style.icon}>
                <use xlinkHref="images/icons.svg#bin" />
              </svg>删除
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default AddrItem;
