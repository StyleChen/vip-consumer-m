import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header, { headerPropTypes } from './Header';
import style from './header.css';

class HeaderWithButton extends PureComponent {
  static propTypes = {
    ...headerPropTypes,
    action: PropTypes.func.isRequired,
    btnName: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    to: '',
  }

  render() {
    return (
      <Header
        to={this.props.to}
        title={this.props.title}
      >
        <button
          className={style.headerBtnAction}
          disabled={this.props.disabled}
          onClick={this.props.action}
        >{this.props.btnName}</button>
      </Header>
    );
  }
}

export default HeaderWithButton;
