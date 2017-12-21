import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, InputWithLabel, MainButton } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import style from './user-change-password.css';

class UserChangePassword extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    /* eslint-disable react/no-unused-prop-types */
  }

  constructor(props) {
    super(props);
    this.state = {
      ordpwd: { value: '', isValid: false },
      newpwd: { value: '', isValid: false },
      newpwd2: { value: '', isValid: false },
      error: '',
    };
  }

  get isPasswordTheSame() {
    const { newpwd, newpwd2 } = this.state;
    return newpwd.value === newpwd2.value;
  }

  get isPasswordAllValid() {
    const { newpwd, newpwd2 } = this.state;
    return newpwd.isValid && newpwd2.isValid;
  }

  changeInputValue = ({ target }, prop) => {
    this.setState({
      [prop]: {
        value: target.value,
        isValid: target.checkValidity(),
      },
    });
  }

  submitPassword = async () => {
    if (this.isPasswordTheSame) {
      this.setState({
        error: '',
      });
      try {
        const { success, result: { code } } = await ajax.post(apis.checkPwd, {
          ordpwd: this.state.ordpwd.value,
          newpwd: this.state.newpwd.value,
        }, true);
        if (success && code === 2) {
          this.props.history.push('/user');
        } else {
          this.setState({ error: '旧密码错误' });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        error: '两次密码不相同',
      });
    }
  }

  render() {
    return (
      <div>
        <Header title="修改密码" />

        <div className={style.inputWrapper}>
          <InputWithLabel
            label="旧密码"
            type="password"
            placeholder="输入旧密码"
            value={this.state.ordpwd.value}
            pattern="\w{6,22}"
            required
            onChange={event => this.changeInputValue(event, 'ordpwd')}
          />
          <InputWithLabel
            label="新密码"
            type="password"
            placeholder="输入6-22位的新密码"
            value={this.state.newpwd.value}
            pattern="\w{6,22}"
            required
            onChange={event => this.changeInputValue(event, 'newpwd')}
          />
          <InputWithLabel
            label="确认密码"
            type="password"
            placeholder="输入确认密码"
            value={this.state.newpwd2.value}
            pattern="\w{6,22}"
            required
            onChange={event => this.changeInputValue(event, 'newpwd2')}
          />
          <div className={style.error} hidden={!this.state.error}>{this.state.error}</div>

          <MainButton
            disabled={!this.isPasswordAllValid}
            text="确认提交"
            action={this.submitPassword}
          />
        </div>
      </div>
    );
  }
}

export default UserChangePassword;
