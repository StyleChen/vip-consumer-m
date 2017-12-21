import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './card-list.css';

class CardItem extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    companylogo: PropTypes.string.isRequired,
    companyname: PropTypes.string.isRequired,
  }

  render() {
    const { ddid, company, companylogo, companyname } = this.props;

    return (
      <li className={style.item}>
        <Link className={style.link} to={`/card/${ddid}`}>
          <img className={style.logo} src={companylogo} alt={companyname} />
          <div className={style.info}>
            <h2 className={style.name}>{companyname}</h2>
            <div className={style.detail}>最近门店: {company}</div>
          </div>
        </Link>
      </li>
    );
  }
}

export default CardItem;
