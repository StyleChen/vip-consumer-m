import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PointItem, Loading } from 'components';
import style from './point-convert-list.css';

class PointConvertList extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchPointConverts: PropTypes.func.isRequired,
  }

  get isEmpty() {
    return this.props.items.length <= 0;
  }

  componentWillMount() {
    const { fetchPointConverts, ddid } = this.props;
    fetchPointConverts({ ddid });
  }

  render() {
    const { fetching, items } = this.props;

    return (
      <div>
        <ul
          className={style.list}
          data-empty={(!fetching && this.isEmpty) ? '' : null}
        >
          {
            items.map(item => (
              <li key={item.id} className={style.item}>
                <PointItem {...item} desc={item.introduce}>
                  <div className={style.itemPoint}>
                    <strong className={style.itemPointNumber}>{item.money}</strong>积分
                  </div>
                </PointItem>
              </li>
            ))
          }
        </ul>

        <Loading active={fetching} />
      </div>
    );
  }
}

export default PointConvertList;
