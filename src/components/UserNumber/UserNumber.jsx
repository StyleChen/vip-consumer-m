import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, BasicInput, MainButton, InputWithLabel } from 'components';
import { ajax } from 'utils';
import { Link } from 'react-router-dom';
import apis from 'apis';
import style from './user-number.css';

class UserNumber extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    /* eslint-disable react/no-unused-prop-types */
    ddid: PropTypes.number.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      error: '',
      hasSentCode: false,
      timeRemain: 60,
      phone: { value: '', isValid: false },
      code: { value: '', isValid: false },
      number: { value: '', isValid: false },
      password: { value: '', isValid: false },
      password2: { value: '', isValid: false },
    };
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  submitPhone = async () => {
    const { success, msg, result } = await ajax.post(apis.VipPhoneCheck, {
      phone: this.state.phone.value,
      ddid: this.props.ddid,
    }, true);
    if (success) {
      if (!result) {
        this.setState({ error: '该号码已被绑定或不存在' });
      } else {
        this.setState({ error: '' });
        this.changeStep(2);
      }
    } else {
      this.setState({ error: msg });
    }
  }

  changeInputValue = ({ target }, prop) => {
    this.setState({
      [prop]: {
        value: target.value,
        isValid: target.checkValidity(),
      },
    });
  }

  changeStep = step => this.setState({ step })

  sendCode = () => {
    const { ddid } = this.props;
    const phone = this.state.phone.value;
    ajax.post(apis.sendCode, { ddid, phone, keyword: '绑定会员卡' }, true);

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
      phone: this.state.phone.value,
      mobile_code: this.state.code.value,
      keyword: '绑定会员卡',
    }, true);
    if (success) {
      this.setState({ error: '' });
      this.changeStep(3);
    } else {
      this.setState({ error: msg });
    }
  }

  submitNumber = async () => {
    const { success, msg } = await ajax.post(apis.NumberCheck, {
      phone: this.state.phone.value,
      ddid: this.props.ddid,
      number: this.state.number.value,
    }, true);
    if (success) {
      this.setState({ error: '' });
      this.changeStep(4);
    } else {
      this.setState({ error: msg });
    }
  }

  submitPassword = async () => {
    if (this.isPasswordTheSame) {
      this.setState({ error: '' });

      const { success, msg } = await ajax.post(apis.ManageAdd, {
        pwd: this.state.password.value,
        ddid: this.props.ddid,
        number: this.state.number.value,
        phone: this.state.phone.value,
      }, true);
      if (success) {
        this.setState({ error: '' });
        this.changeStep(5);
        this.setState({ timeRemain: 5 });
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.setState({ timeRemain: this.state.timeRemain - 1 });

          if (this.state.timeRemain < 0) {
            clearInterval(this.timer);
            this.setState({
              timeRemain: 60,
            });
            this.props.history.push('user');
          }
        }, 1000);
      } else {
        this.setState({ error: msg });
      }
    } else {
      this.setState({ error: '两次密码不相同' });
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

  render() {
    return (
      <div>
        <Header title="绑定会员卡" />

        {/* 第一部： 输入手机号 */}
        <div className={style.inputWrapper} hidden={this.state.step !== 1}>
          <BasicInput
            type="text"
            placeholder="输入你办理会员卡时预留的手机号码"
            value={this.state.phone.value}
            pattern="\d+"
            required
            onChange={event => this.changeInputValue(event, 'phone')}
          />

          <div className={style.error} hidden={!this.state.error} >{this.state.error}</div>
          <MainButton
            disabled={!this.state.phone.isValid}
            text="下一步"
            action={this.submitPhone}
          />
        </div>

        {/* 第二部： 发送验证码到手机*/}
        <div hidden={this.state.step !== 2}>
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

        {/* 第三部： 绑定会员卡 */}
        <div hidden={this.state.step !== 3}>
          <h2 className={style.title}>手机号码验证成功，请输入你的会员卡号</h2>
          <InputWithLabel
            label="会员卡号"
            type="text"
            placeholder="请输入会员卡号"
            value={this.state.number.value}
            pattern="\d+"
            required
            onChange={event => this.changeInputValue(event, 'number')}
          />
          <div className={style.error} hidden={!this.state.error}>{this.state.error}</div>
          <MainButton
            disabled={!this.state.number.isValid}
            text="下一步"
            action={this.submitNumber}
          />
        </div>

        {/* 第四部： 设置支付密码 */}
        <div hidden={this.state.step !== 4}>
          <h2 className={style.title}>会员卡绑定成功，请设置你的密码</h2>
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

        {/* 第五部： 支付密码设置成功*/}
        <div hidden={this.state.step !== 5}>
          <div className={style.contentWrapper}>
            <h2 className={style.bigTitle}>
              <svg className={style.icon}>
                <use xlinkHref="#ok" />
              </svg>支付密码设置成功</h2>
            <div className={style.tip}>
              <span>{this.state.timeRemain}</span>
              &nbsp;秒后返回设置&nbsp;
              <Link to="/user">直接返回</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserNumber;
