import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './basic-input.css';

export const inputPropTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.func,
  pattern: PropTypes.string.isRequired,
};

class BasicInput extends PureComponent {
  static propTypes = inputPropTypes

  static defaultProps = {
    required: false,
  }

  render() {
    return (
      <input
        className={style.input}
        type={this.props.type}
        placeholder={this.props.placeholder}
        value={this.props.value}
        pattern={this.props.pattern}
        required={this.props.required}
        onChange={this.props.onChange}
      />
    );
  }
}

export default BasicInput;
