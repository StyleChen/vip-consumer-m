import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMenu } from 'redux/modules/menu';
import style from './header.css';

class Menu extends PureComponent {
  static menuItems = [
    { icon: 'cart-o', text: '购物车', to: '', ajust: true },
    { icon: 'message', text: '消息', to: '' },
    { icon: 'service', text: '帮助', to: '' },
    { icon: 'join', text: '入驻', to: '' },
    { icon: 'share', text: '分享', to: '' },
  ]

  static propTypes = {
    menu: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  }

  toggleMenu = (event) => {
    event.stopPropagation();
    this.props.toggleMenu();
  }

  render() {
    return (
      <div className={style.menu}>
        <button
          className={style.headerBtn}
          onClick={this.toggleMenu}
        >
          <svg className={style.btnSvg}>
            <use xlinkHref="#menu" />
          </svg>
        </button>
        <div className={this.props.menu ? style.wrapperActive : style.wrapper}>
          <ul className={style.menuList}>
            {
              Menu.menuItems.map(({ to, icon, text, ajust }) => (
                <li key={text} className={style.listItem}>
                  <Link className={style.itemLink} to={to}>
                    <svg className={ajust ? style.itemSvgAjust : style.itemSvg}>
                      <use xlinkHref={`#${icon}`} />
                    </svg>
                    {text}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

// 正常情况下，components下的组件不应该有自己的状态
// 这里因为此组件在非常多地方用到，为了不重复在每一个父组件里拿此组件所需的一个状态
// 故此组件例外地自行connect，自己获取所需状态，而不从父组件处获取
export default connect(
  ({ menu }) => ({ menu }),
  dispatch => bindActionCreators({ toggleMenu }, dispatch),
)(Menu);
