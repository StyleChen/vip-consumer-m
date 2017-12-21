import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './light-button.css';

class LightButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    theme: PropTypes.bool,
  }

  static defaultProps = {
    theme: false,
  }

  render() {
    return (
      <button
        type="button"
        className={this.props.theme ? style.buttonTheme : style.button}
        onClick={this.props.action}
      >{this.props.text}</button>
    );
  }
}

export default LightButton;
