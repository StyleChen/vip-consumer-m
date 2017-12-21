import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as ctns from 'containers';
import { HeaderWithMenu, FilterBar } from 'components';
import style from './point.css';

class Point extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    info: PropTypes.shape({
      count: PropTypes.number,
    }).isRequired,
    fetchPointInfo: PropTypes.func.isRequired,
  }

  static filterItems = [
    { text: '积分记录', to: '/point/record' },
    { text: '积分兑换', to: '/point/convert' },
    { text: '积分订单', to: '/point/order' },
  ]

  componentWillMount() {
    const { ddid, fetchPointInfo } = this.props;
    fetchPointInfo(ddid);
  }

  render() {
    return (
      <div>
        <HeaderWithMenu title="积分" />

        <div className={style.currentPoint}>
          <div className={style.number}>{this.props.info.count}</div>
          <div className={style.text}>当前积分</div>
        </div>

        <FilterBar filterItems={Point.filterItems} />

        <Route path="/point/record" component={ctns.PointRecordList} />
        <Route path="/point/convert" component={ctns.PointConvertList} />
        <Route path="/point/order" component={ctns.PointOrderList} />

      </div>
    );
  }
}

export default Point;
