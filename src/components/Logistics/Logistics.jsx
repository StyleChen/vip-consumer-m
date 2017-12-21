import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu, BillHeader } from 'components';
import style from './logistics.css';

class Logistics extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        logisticCode: PropTypes.string,
        shipperCode: PropTypes.string,
      }),
    }).isRequired,
    Traces: PropTypes.arrayOf(PropTypes.object).isRequired,
    State: PropTypes.string.isRequired,
    fetchLogistics: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { match, fetchLogistics } = this.props;
    const { logisticCode, shipperCode } = match.params;
    fetchLogistics({ shipperCode, logisticCode });
  }

  get tracesState() {
    const { State } = this.props;
    switch (State) {
      case '0':
        return '无轨迹';
      case '1':
        return '已揽收';
      case '2':
        return '在途中';
      case '201':
        return '到达派件城市';
      case '3':
        return '签收';
      case '4':
        return '问题件';
      default:
        return '暂无物流信息';
    }
  }

  render() {
    const { match, Traces } = this.props;
    const { logisticCode, shipperCode } = match.params;

    return (
      <div>
        <HeaderWithMenu title="物流配送" />

        <BillHeader
          billState={this.tracesState}
          billItems={[
            { label: '物流单号', content: logisticCode },
            { label: '物流名称', content: shipperCode },
          ]}
        />

        <ul className={style.list}>
          {
            Traces.map(trace => (
              <li className={style.item}>
                <div className={style.msg}>{trace.AcceptStation}</div>
                <time className={style.time}>{trace.AcceptTime}</time>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Logistics;
