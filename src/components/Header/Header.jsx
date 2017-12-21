import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './header.css';

export const headerPropTypes = {
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
};

class Header extends PureComponent {
  static propTypes = {
    ...headerPropTypes,
    children: PropTypes.element,
  }

  static defaultProps = {
    children: null,
    to: '',
  }

  back = (event) => {
    if (!this.props.to) {
      event.preventDefault();
      history.back();
    }
  }

  render() {
    return (
      <header className={style.header}>
        <Link className={style.return} to={this.props.to} onClick={this.back}>
          <svg className={style.returnSvg}><use xlinkHref="#arrow-left" /></svg>
        </Link>
        <h1 className={style.title}>{this.props.title}</h1>
        {this.props.children || <span className={style.empty} />}
      </header>
    );
  }
}

export default Header;
