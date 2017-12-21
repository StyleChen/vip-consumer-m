import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './bill-item.css';

class BillItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      logo: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      money: PropTypes.string.isRequired,
    })).isRequired,
    positive: PropTypes.bool, // 表示强调正数
    negative: PropTypes.bool, // 表示强调负数
  }

  static defaultProps = {
    positive: false,
    negative: false,
  }

  getMoneyClassName = (money) => {
    const { positive, negative } = this.props;
    if (positive && (+money > 0)) {
      return style.moneyPositive;
    }
    if (negative && (+money) < 0) {
      return style.moneyNegative;
    }
    return style.money;
  }

  render() {
    return (
      <li className={style.item}>
        <h2 className={style.title}>{this.props.title}</h2>
        <ul className={style.entryList}>
          {
            this.props.entries.map(entry => (
              <li className={style.entry}>
                <img className={style.logo} src={entry.logo} alt="" />

                <div className={style.content}>
                  <h3 className={style.info}>{entry.company}</h3>
                  <time className={style.time}>{entry.time}</time>
                </div>

                <div className={this.getMoneyClassName(entry.money)}>{entry.money}</div>
              </li>
            ))
          }
        </ul>
      </li>
    );
  }
}

export default BillItem;
