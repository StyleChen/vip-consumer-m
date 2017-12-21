import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './main-button.css';

class MainButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    return (
      <div className={style.wrapper}>
        <button
          type="button"
          className={style.button}
          onClick={this.props.action}
          disabled={this.props.disabled}
        >{this.props.text}</button>
      </div>
    );
  }
}

export default MainButton;
