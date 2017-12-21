import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './modal.css';

class Modal extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    size: PropTypes.string,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    size: '1',
  }

  render() {
    const { active, size, children } = this.props;

    return (
      <div
        className={active ? style.modalActive : style.modal}
        data-size={size}
      >{children}</div>
    );
  }
}

export default Modal;
