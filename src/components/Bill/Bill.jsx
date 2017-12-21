import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu, FilterBar, BillItem, Loading, MainButton } from 'components';
import { PAGE_SIZE } from 'redux/modules/bills/bills';
import style from './bill.css';

class Bill extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
      }),
    }).isRequired,
    ddid: PropTypes.number.isRequired,
    fetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
    fetchBills: PropTypes.func.isRequired,
  }

  static filterItems = [
    { text: '全部', to: '/bill/all' },
    { text: '充值', to: '/bill/topup' },
    { text: '消费', to: '/bill/consume' },
  ]

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
    const { fetchBills, ddid, match } = this.props;
    this.setState(
      { pageIndex: 1 },
      () => fetchBills({ ddid, type: match.params.type }),
    );
  }

  componentWillUpdate(nextProps) {
    const { type } = nextProps.match.params;
    if (type !== this.props.match.params.type) {
      const { fetchBills, ddid } = this.props;
      this.setState(
        { pageIndex: 1 },
        () => fetchBills({ ddid, type }),
      );
    }
  }

  fetchNextPage = () => {
    const { fetchBills, ddid, match } = this.props;
    const pageIndex = this.state.pageIndex + 1;
    this.setState(
      { pageIndex },
      () => fetchBills({ ddid, type: match.params.type, pageIndex }),
    );
  }

  render() {
    const { fetching, items } = this.props;

    return (
      <div>
        <HeaderWithMenu title="账单查询" />

        <FilterBar filterItems={Bill.filterItems} />

        <ul
          className={style.list}
          data-empty={(!fetching && this.isEmpty) ? '' : null}
        >
          {items.map(item => <BillItem key={item.title} {...item} positive />)}
        </ul>

        <Loading active={fetching} />

        <div hidden={fetching || this.isLastPage}>
          <MainButton text="加载更多" action={this.fetchNextPage} />
        </div>
      </div>
    );
  }
}

export default Bill;
