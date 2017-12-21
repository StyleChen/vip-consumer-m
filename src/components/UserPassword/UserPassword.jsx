import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, InputWithLabel, MainButton } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import style from './user-password.css';

class UserPassword extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    /* eslint-disable react/no-unused-prop-types */
    ddid: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      hasSentCode: false,
      timeRemain: 60,
      code: { value: '', isValid: false },
      password: { value: '', isValid: false },
      password2: { value: '', isValid: false },
      error: '',
    };
  }

  // componentWillMount() {
  //   this.sendCode();
  // }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  get isPasswordTheSame() {
    const { password, password2 } = this.state;
    return password.value === password2.value;
  }

  get isPasswordAllValid() {
    const { password, password2 } = this.state;
    return password.isValid && password2.isValid;
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
    const { ddid } = this.props;
    ajax.post(apis.sendCode, { ddid, keyword: '修改密码' }, true);

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
      keyword: '修改密码',
    }, true);
    if (success) {
      this.setState({ error: '' });
      this.changeStep(2);
    } else {
      this.setState({ error: msg });
    }
  }

  submitPassword = async () => {
    if (this.isPasswordTheSame) {
      this.setState({ error: '' });

      const { success, msg } = await ajax.post(apis.changePassword, {
        pwd: this.state.password,
        ddid: this.props.ddid,
      }, true);
      if (success) {
        this.props.history.push('user');
      } else {
        this.setState({ error: msg });
      }
    } else {
      this.setState({ error: '两次密码不相同' });
    }
  }

  render() {
    return (
      <div>
        <Header title="设置支付密码" />

        {/* 第二部： 输入验证码 */}
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

        {/* 第三部： 设置密码 */}
        <div hidden={this.state.step !== 2}>
          <h2 className={style.title}>手机号码验证成功，设置你的密码</h2>
          <InputWithLabel
            label="支付密码"
            type="password"
            placeholder="请输入支付密码"
            value={this.state.password.value}
            pattern="\d+"
            required
            onChange={event => this.changeInputValue(event, 'password')}
          />
          <InputWithLabel
            label="确认密码"
            type="password"
            placeholder="再次输入密码"
            value={this.state.password2.value}
            pattern="\d+"
            required
            onChange={event => this.changeInputValue(event, 'password2')}
          />
          <div className={style.error} hidden={!this.state.error}>{this.state.error}</div>
          <MainButton
            disabled={!this.isPasswordAllValid}
            text="下一步"
            action={this.submitPassword}
          />
        </div>
      </div>
    );
  }
}

export default UserPassword;
