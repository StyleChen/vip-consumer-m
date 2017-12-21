import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ajax } from 'utils';
import apis from 'apis';
import { HeaderWithMenu, LineContainer, LineItem, Modal } from 'components';


import style from './user-info.css';

class UserInfo extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    vipstate: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      ddid: PropTypes.number,
      logo: PropTypes.string,
      name: PropTypes.string,
      sex: PropTypes.string,
      address: PropTypes.string,
      area: PropTypes.string,
      brithday: PropTypes.string,
      phone: PropTypes.string,
      number: PropTypes.string, // 会员卡号
      level: PropTypes.string, // 会员等级
    }).isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    changeUserInfo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.headChange = this.headChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      show: false,
    };
  }

  headChange(event) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    ajax.post('http://upload.dreamhiway.com/uploadimg?key=o2o&t=50x50', formData)
      .then((res) => {
        this.props.changeUserInfo({ logo: `http://upload.dreamhiway.com/img/${res.path + res.name}.jpg` });
        ajax.post(apis.imgEdit, {
          logo: `${res.path + res.name}.jpg`,
          imagesize: '50x50',
        }, true);
      });
  }

  showModal() {
    document.body.setAttribute('data-mask', '');
    this.setState({
      show: true,
    });
  }

  closeModal() {
    document.body.removeAttribute('data-mask');
    this.setState({
      show: false,
    });
  }

  componentWillMount() {
    this.props.fetchUserInfo(this.props.ddid);
  }

  render() {
    const { userInfo } = this.props;

    return (
      <div>
        <HeaderWithMenu title="我的资料" />

        <div className={style.userTitle} >
          <img className={style.userAvatar} src={userInfo.logo} alt={userInfo.name} />
          <h2 className={style.userName}>{userInfo.name}</h2>
          <span className={style.userVip}>{userInfo.level}</span>
          <input type="file" className={style.filler} accept="image/*" name="file" onChange={this.headChange} />
          <svg className={style.arrow}><use xlinkHref="#arrow-right" /></svg>
        </div>

        <LineContainer>
          <div>
            <Link to="/user-phone">
              <LineItem label="手机号码" content={userInfo.phone} arrow />
            </Link>
            <Link to="/user-addr">
              <LineItem label="收货地址" arrow />
            </Link>
          </div>
        </LineContainer>

        <LineContainer>
          <div>
            <Link to="/user-change-pwd">
              <LineItem label="修改登录密码" arrow />
            </Link>
            <Link to="/user-number">
              <LineItem label="会员卡号" content={userInfo.number} arrow />
            </Link>
            <Link to="/user-password" hidden={this.props.vipstate === 0}>
              <LineItem label="设置支付密码" arrow />
            </Link>
          </div>
        </LineContainer>
        {
          document.cookie.includes('accountType') ?
            <LineContainer>
              <div className={style.logout} onClick={this.showModal}>
                <LineItem label="退出登录" />
              </div>
            </LineContainer> : null
        }

        <Modal active={this.state.show}>
          <div>
            <div data-modal-body>你确定要退出登录？</div>
            <div data-modal-footer>
              <button onClick={this.closeModal}>取消</button>
              <button
                onClick={() => {
                  location.href = 'http://www.mengyunjie.com/m/Login/Logout?redirectURL=/m/o2oshop?ddid=703';
                }
                }
                data-danger
              >
                退出</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserInfo;

