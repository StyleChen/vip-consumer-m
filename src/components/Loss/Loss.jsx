import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu, MainButton } from 'components';
import { ajax } from 'utils';
import apis from 'apis';
import style from './loss.css';

class Loss extends PureComponent {
  static propTypes = {
    ddid: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    stateid: PropTypes.number.isRequired, // 1--正常， 2--已挂失
    changeCard: PropTypes.func.isRequired,
    fetchCardState: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  get isNormal() {
    return this.props.stateid === 1;
  }

  get icon() {
    return Loss.cardStates[this.props.stateid].icon;
  }

  componentWillMount() {
    this.props.fetchCardState(this.props.ddid);
  }

  reportLoss = async () => {
    try {
      const { success, result } = await ajax.post(apis.changeCardState, {
        ddid: this.props.ddid,
      }, true);
      if (success && result) {
        this.props.changeCard({ state: '已挂失', stateid: 2 });
      }
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <div>
        <HeaderWithMenu title="挂卡补失" />

        <div className={style.state}>
          <svg className={style.svg}>
            <use xlinkHref={`#${this.isNormal ? 'ok' : 'lock'}`} />
          </svg>
          <span>
            会员卡状态:
            <em className={this.isNormal ? style.stateText : style.stateTextLoss}>
              {this.props.state}
            </em>
          </span>
        </div>

        <div className={style.tip}>请在挂失后及时到最近门店进行补卡</div>

        <MainButton
          text={this.isNormal ? '紧急挂失' : '重新绑定'}
          action={this.isNormal ? this.reportLoss : this.props.history.push('user-number')}
        />
      </div>
    );
  }
}

export default Loss;
