import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './filterbar.css';


class FilterBar extends Component {
  static propTypes = {
    filterItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return (
      <ul className={style.bar}>
        {
          this.props.filterItems.map(({ to, text }) => (
            <li key={to} className={style.item}>
              <NavLink
                className={style.itemLink}
                activeClassName={style.active}
                to={to}
                exact
                replace
              >{text}</NavLink>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default FilterBar;
