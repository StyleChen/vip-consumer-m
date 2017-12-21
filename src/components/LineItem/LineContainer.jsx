import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './line-item.css';

class LineContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div className={style.container}>
        {this.props.children}
      </div>
    );
  }
}

export default LineContainer;
