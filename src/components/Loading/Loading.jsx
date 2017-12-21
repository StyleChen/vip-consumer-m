import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './loading.css';

class Loading extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className={style.loading} hidden={!this.props.active}>
        <svg className={style.svg}><use xlinkHref="#spinner" /></svg>
      </div>
    );
  }
}

export default Loading;
