import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ajax } from 'utils';
import apis from 'apis';
import { HeaderWithButton, LineContainer, LineItem, Modal, MainButton } from 'components';
import style from './user-addr-detail.css';

class UserAddrDetail extends PureComponent {
  static sharedPropTypes = PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    userAddr: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      mobile: PropTypes.string,
      area: PropTypes.shape({
        province: UserAddrDetail.sharedPropTypes,
        city: UserAddrDetail.sharedPropTypes,
        district: UserAddrDetail.sharedPropTypes,
      }),
      address: PropTypes.string,
      isDefault: PropTypes.bool,
      title: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    changeUserAddr: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
    };
  }

  get areaText() {
    const { province, city, district } = this.props.userAddr.area;
    return `${province.name} ${city.name} ${district.name}`.trim();
  }

  changeAddr = ({ target }, prop) => {
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.props.changeUserAddr({ [prop]: value });
  }

  saveAddr = async () => {
    const { id, ...others } = this.props.userAddr;

    const isNew = id === 0;
    const api = isNew ? apis.addAddr : apis.editAddr;
    const data = isNew ? others : ({ ...others, id });

    if (this.form.checkValidity()) {
      try {
        const { success, result } = await ajax.post(api, data, true);
        if (success && result) {
          this.props.history.push('/user-addr');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      document.body.setAttribute('data-mask', '');
      this.setState({
        modalActive: true,
      });
    }
  }

  closeModal = () => {
    document.body.removeAttribute('data-mask');
    this.setState({
      modalActive: false,
    });
  }

  render() {
    const {
      name,
      mobile,
      address,
      isDefault,
      title,
    } = this.props.userAddr;

    return (
      <div>
        <HeaderWithButton
          title="我的收货地址"
          btnName="保存"
          action={this.saveAddr}
        />

        <form ref={(form) => { this.form = form; }}>
          <LineContainer>
            <div>
              <LineItem label="收货人">
                <input
                  type="text" value={name} required
                  onChange={event => this.changeAddr(event, 'name')}
                />
              </LineItem>
              <LineItem label="联系电话">
                <input
                  type="text" value={mobile} required pattern="\d+"
                  onChange={event => this.changeAddr(event, 'mobile')}
                />
              </LineItem>
              <Link to="/user-addr-area">
                <LineItem label="所在地区" arrow>
                  <input type="text" value={this.areaText} placeholder="请选择" required />
                </LineItem>
              </Link>
            </div>
          </LineContainer>

          <Link to="/user-area-lock">
            <LineItem label="详细地址" arrow>
              <input type="text" placeholder="请选择" required value={title} />
            </LineItem>
          </Link>
          <div className={style.address}>
            <textarea
              className={style.addressInput} id="address" name="address"
              value={address} required
              onChange={event => this.changeAddr(event, 'address')}
            />
          </div>

          <div className={style.setDefault}>
            <input
              type="checkbox" id="isDefault" name="isDefault"
              checked={isDefault} onClick={event => this.changeAddr(event, 'isDefault')}
            />
            <label htmlFor="isDefault" >
              <svg className={style.checkIcon}>
                <use xlinkHref="#ok" />
              </svg>默认地址
            </label>
          </div>
        </form>
        <MainButton text="保存" action={this.saveAddr} />
        <Modal active={this.state.modalActive}>
          <div>
            <div data-modal-body>您填写的信息不完整或格式有误，请重新核对</div>
            <div data-modal-footer>
              <button onClick={this.closeModal} data-danger>确定</button>
            </div>
          </div>
        </Modal>

      </div>
    );
  }
}

export default UserAddrDetail;
