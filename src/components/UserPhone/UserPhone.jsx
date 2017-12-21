import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputWithLabel, BasicInput, MainButton } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import style from './user-phone.css';

class UserPhone extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    /* eslint-disable react/no-unused-prop-types */
    ddid: PropTypes.number.isRequired,
    changeUserInfo: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      phone: { value: '', isValid: false },
      step: 1,
      hasSentCode: false,
      timeRemain: 60,
      code: { value: '', isValid: false },
      error: '',
    };
  }

  changeStep = step => this.setState({ step })

  changeInputValue = ({ target }, prop) => {
    this.setState({
      [prop]: {
        value: target.value,
        isValid: target.checkValidity(),
      },
    });
  }

  sendCode = () => {
    const { ddid, phone } = this.props;
    ajax.post(apis.sendCode, { ddid, keyword: '修改手机号', phone }, true);

    this.setState({ hasSentCode: true });

    this.timer = setInterval(() => {
      this.setState({ timeRemain: this.state.timeRemain - 1 });

      if (this.state.timeRemain <= 0) {
        clearInterval(this.timer);
        this.setState({
          hasSentCode: false,
          timeRemain: 60,
        });
      }
    }, 1000);
  }

  submitCode = async () => {
    const { success, msg } = await ajax.post(apis.checkCode, {
      phone: this.props.phone,
      mobile_code: this.state.code.value,
      keyword: '修改手机号',
    }, true);
    if (success) {
      this.setState({ error: '' });
      this.changeStep(2);
    } else {
      this.setState({ error: msg });
    }
  }

  changePhone = ({ target }) => {
    this.setState({
      phone: {
        value: target.value,
        isValid: target.checkValidity(),
      },
    });
  }

  savePhone = async () => {
    const { value: phone } = this.state.phone;
    try {
      const { success, result, code } = await ajax.post(apis.changeUserPhone, {
        ddid: this.props.ddid,
        phone,
      }, true);
      if (success && result && code) {
        this.props.changeUserInfo({ phone });
        this.props.history.push('/user');
      } else {
        this.setState({
          error: '您的号码已绑定其他会员卡',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {/* 第1部： 输入验证码 */}
        <div hidden={this.state.step !== 1}>
          <h2 className={style.title} hidden={!this.state.hasSentCode}>
            我们已发送<span className={style.titleHighlight}>验证码</span>到你的手机
          </h2>
          <div className={style.codeInput}>
            <InputWithLabel
              label="验证码"
              type="text"
              placeholder="输入短信验证码"
              value={this.state.code.value}
              pattern="\d{6}"
              required
              onChange={event => this.changeInputValue(event, 'code')}
            />
            <button
              className={style.codeSend}
              disabled={this.state.hasSentCode}
              onClick={this.sendCode}
            >
              {this.state.hasSentCode ? `${this.state.timeRemain}秒后重发` : '发送验证码'}
            </button>
          </div>
          <div className={style.error} hidden={!this.state.error} >{this.state.error}</div>
          <MainButton
            disabled={!this.state.code.isValid}
            text="下一步"
            action={this.submitCode}
          />
        </div>

        <div className={style.inputWrapper} hidden={this.state.step !== 2}>
          <BasicInput
            type="text"
            placeholder="请填写电话号码"
            value={this.state.phone.value}
            pattern="^1[53847]\d{9}$" required
            onChange={this.changePhone}
          />
          <div className={style.error} hidden={!this.state.error} >{this.state.error}</div>
          <MainButton
            disabled={!this.state.phone.isValid}
            text="保存"
            action={this.savePhone}
          />
        </div>
      </div>
    );
  }
}

export default UserPhone;
