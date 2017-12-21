import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './bill-header.css';

class BillHeader extends PureComponent {
  static propTypes = {
    billState: PropTypes.string.isRequired,
    billItems: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      conetnt: PropTypes.string.isRequired,
    })).isRequired,
  }

  render() {
    return (
      <div className={style.billHeader}>
        <h2 className={style.state}>{this.props.billState}</h2>
        <ul className={style.list}>
          {
            this.props.billItems.map(billItem => (
              <li
                key={billItem.label}
                className={style.item}
              >{billItem.label}: {billItem.content}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default BillHeader;
