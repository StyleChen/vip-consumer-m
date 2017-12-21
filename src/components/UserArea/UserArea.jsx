import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu } from 'components';
import apis from 'apis';
import { ajax } from 'utils';
import style from './user-area.css';

class UserArea extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    /* eslint-disable react/no-unused-prop-types */
    ddid: PropTypes.number.isRequired,
    currentArea: PropTypes.string.isRequired,
    changeUserInfo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      area: [],
      activeProv: null,
    };
  }

  componentWillMount() {
    this.getArea();
  }

  getArea = async () => {
    try {
      const { result: area } = await ajax.get(apis.getArea);
      this.setState({ area });
    } catch (error) {
      console.log(error);
    }
  }

  changeActiveProv = (name) => {
    const activeProv = (name === this.state.activeProv) ? null : name;
    this.setState({ activeProv });
  }

  isActiveProv = name => name === this.state.activeProv;

  changeArea = async (city) => {
    try {
      const area = {
        address: this.state.activeProv,
        area: city,
      };
      const { success, result } = await ajax.post(apis.changeUserArea, {
        ...area,
        ddid: this.props.ddid,
      }, true);
      if (success && result) {
        this.props.changeUserInfo(area);
        this.props.history.push('/user');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <HeaderWithMenu title="城市列表" />

        <div className={style.current}>当前: {this.props.currentArea}</div>

        <h2 className={style.title}>省/市列表</h2>
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <ul className={style.provList}>
          {this.state.area.map(prov => (
            <li key={prov.code}>
              <div
                className={this.isActiveProv(prov.name) ? style.provItemActive : style.provItem}
                onClick={() => this.changeActiveProv(prov.name)}
              >
                {prov.name}
                <svg className={style.icon}><use xlinkHref="#arrow-bottom" /></svg>
              </div>
              <ul className={style.cityList}>
                {prov.citys.map(city => (
                  <li
                    key={city.code}
                    className={style.cityItem}
                    onClick={() => this.changeArea(city.name)}
                  >
                    {city.name}
                    <svg className={style.icon}><use xlinkHref="#arrow-right" /></svg>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserArea;
