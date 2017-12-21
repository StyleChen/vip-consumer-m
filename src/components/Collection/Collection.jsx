import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loading, Modal } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import CollectionItem from './CollectionItem';
import style from './collection.css';

class Collection extends PureComponent {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    fetchCollection: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      modalActive: false,
      modalText: '是否确认取消该收藏？',
      productid: '',
      count: 0,
    };
  }

  componentWillMount() {
    const { fetchCollection } = this.props;
    fetchCollection();
    this.checkCount();
  }

  componentDidUpdate() {
    if (this.props.data.length) {
      document.getElementById('mui').setAttribute('href', 'https://cdn.bootcss.com/mui/3.4.0/css/mui.min.css');
    }
  }

  componentWillUnmount() {
    document.getElementById('mui').removeAttribute('href');
  }

  get isEmpty() {
    return this.props.data.length <= 0;
  }

  showModal = () => {
    document.body.setAttribute('data-mask', '');
    this.setState({
      modalActive: true,
    });
  }

  closeModal = () => {
    document.body.removeAttribute('data-mask');
    this.setState({
      modalActive: false,
    });
  }

  getModal = (productid) => {
    this.setState({
      productid,
    });
  }

  addToCart = async (pid) => {
    try {
      const { success } = await ajax.post(apis.addToCart, {
        productid: pid,
        count: 1,
        sendmode: 1,
      }, true);
      if (success) {
        alert('加入购物车成功!!');
        this.checkCount();
      }
    } catch (error) {
      console.log(error);
    }
  }

  checkCount() {
    ajax.post(apis.cartCount, { ddid: sessionStorage.ddid || 48 }, true)
      .then(({ result }) => {
        this.setState({ count: result });
      })
      .catch((error) => { console.log(error); });
  }

  handleOrder = async () => {
    try {
      const { success, result } = await ajax.post(apis.collectDel,
        { productid: this.state.productid }, true);
      if (success && result) {
        this.closeModal();
        this.props.fetchCollection();
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { fetching } = this.props;

    return (
      <div>
        <ul
          className={`${style.list} mui-table-view`}
          data-empty={(!fetching && this.isEmpty) ? '' : null}
        >
          {this.props.data.map(item =>
            <CollectionItem {...item} showModal={this.showModal} getModal={this.getModal} addToCart={this.addToCart} />)}
        </ul>

        <div className={style.shoppingCart}>
          <a href="/m-jimi/cart" className={style.cartLink}>
            <svg className={style.icon}>
              <use xlinkHref="#cart" />
            </svg>
          </a>
          <div className={style.count} hidden={!this.state.count}>{this.state.count}</div>
        </div>

        <Loading active={fetching} />

        <Modal active={this.state.modalActive}>
          <div>
            <div data-modal-body>{this.state.modalText}</div>
            <div data-modal-footer>
              <button onClick={this.closeModal}>取消</button>
              <button onClick={this.handleOrder} data-danger>
                确定</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Collection;
