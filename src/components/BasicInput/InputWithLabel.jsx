/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BasicInput, { inputPropTypes } from './BasicInput';
import style from './basic-input.css';

class InputWithLabel extends PureComponent {
  static propTypes = {
    ...inputPropTypes,
    label: PropTypes.string.isRequired,
  }

  render() {
    return (
      <label className={style.label}>
        <span className={style.labelText}>{this.props.label}</span>
        <BasicInput
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          pattern={this.props.pattern}
          require={this.props.required}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}

export default InputWithLabel;
