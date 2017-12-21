import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BillItem, Loading, MainButton } from 'components';
import { PAGE_SIZE } from 'redux/modules/point/records/records';
import style from './point-record-list.css';

class PointRecordList extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchPointRecords: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    };
  }

  get pageCount() {
    return Math.ceil(this.props.total / PAGE_SIZE);
  }

  get isEmpty() {
    return this.props.items.length <= 0;
  }

  get isLastPage() {
    return this.state.pageIndex >= this.pageCount;
  }


  componentWillMount() {
    const { fetchPointRecords, ddid } = this.props;
    this.setState(
      { pageIndex: 1 },
      () => fetchPointRecords({ ddid }),
    );
  }

  fetchNextPage = () => {
    const { fetchPointRecords, ddid } = this.props;
    const pageIndex = this.state.pageIndex + 1;
    this.setState(
      { pageIndex },
      () => fetchPointRecords({ ddid, pageIndex }),
    );
  }

  render() {
    const { fetching, items } = this.props;

    return (
      <div>
        <ul
          className={style.list}
          data-empty={(!fetching && this.isEmpty) ? '' : null}
        >
          {items.map(item => <BillItem key={item.title} {...item} negative />)}
        </ul>

        <Loading active={fetching} />

        <div hidden={fetching || this.isLastPage}>
          <MainButton text="加载更多" action={this.fetchNextPage} />
        </div>
      </div>
    );
  }
}

export default PointRecordList;
