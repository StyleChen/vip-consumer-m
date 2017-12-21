import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './line-item.css';

class LineItem extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    content: PropTypes.string,
    arrow: PropTypes.bool,
    children: PropTypes.element,
    icon: PropTypes.element,
  }

  static defaultProps = {
    content: '',
    arrow: false,
    children: null,
  }

  render() {
    return (
      <div className={style.lineItem}>
        {this.props.icon}
        <span className={style.label}>{this.props.label}</span>
        {this.props.children || <span className={style.content}>{this.props.content}</span>}
        {
          this.props.arrow ? (
            <svg className={style.arrow}><use xlinkHref="#arrow-right" /></svg>
          ) : null
        }
      </div>
    );
  }
}

export default LineItem;
