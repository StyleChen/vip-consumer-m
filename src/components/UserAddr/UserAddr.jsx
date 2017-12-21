import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, MainButton, Modal } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import AddrItem from './AddrItem';
import style from './user-addr.css';

class UserAddr extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    userAddrs: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchUserAddrs: PropTypes.func.isRequired,
    changeUserAddrDefault: PropTypes.func.isRequired,
    removeUserAddr: PropTypes.func.isRequired,
    changeUserAddr: PropTypes.func.isRequired,
    resetUserAddr: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      removeId: null,
      modalActive: false,
    };
  }

  componentWillMount() {
    this.props.fetchUserAddrs();
    this.props.resetUserAddr();
    console.log(this.props.userAddrs);
  }

  showModal = (id) => {
    document.body.setAttribute('data-mask', '');
    this.setState({
      removeId: id,
      modalActive: true,
    });
  }

  closeModal = () => {
    document.body.removeAttribute('data-mask');
    this.setState({
      removeId: null,
      modalActive: false,
    });
  }

  setAddrDefault = async (id) => {
    try {
      const { success, result } = await ajax.post(apis.setDefault, { id }, true);
      if (success && result) {
        this.props.changeUserAddrDefault(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  editAddr = (id) => {
    const { history, userAddrs, changeUserAddr } = this.props;

    const {
      province_name, province_code, city_name, city_code, district_name, district_code,
      ...others
    } = userAddrs.find(addr => addr.id === +id);

    changeUserAddr({
      ...others,
      area: {
        province: { name: province_name, code: province_code },
        city: { name: city_name, code: city_code },
        district: { name: district_name, code: district_code },
      },
    });

    history.push(`/user-addr/${id}`);
  }

  removeAddr = async () => {
    try {
      const { removeId: id } = this.state;
      if (id) {
        const { success, result } = await ajax.post(apis.deleteAddr, { id }, true);
        if (success && result) {
          this.closeModal();
          this.props.removeUserAddr(id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  addAddr = () => this.props.history.push('/user-addr/0')

  render() {
    return (
      <div>
        <Header title="我的收货地址" />

        <ul className={style.list}>
          {this.props.userAddrs.map(addr => (
            <AddrItem
              key={addr.id}
              {...addr}
              setAddrDefault={this.setAddrDefault}
              showModal={this.showModal}
              editAddr={this.editAddr}
            />
          ))}
        </ul>

        <Modal active={this.state.modalActive}>
          <div>
            <div data-modal-body>是否确认删除该地址？</div>
            <div data-modal-footer>
              <button onClick={this.closeModal}>取消</button>
              <button onClick={this.removeAddr} data-danger>删除</button>
            </div>
          </div>
        </Modal>

        <footer className={style.footer}>
          <MainButton text="添加新地址" action={this.addAddr} />
        </footer>
      </div>
    );
  }
}

export default UserAddr;
