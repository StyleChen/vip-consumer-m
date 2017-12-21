import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu } from 'components';
import apis from 'apis';
import { ajax } from 'utils';
import style from './user-addr-area.css';

/**
 * 这个页面和UserArea非常相似
 * 由于目前的UI和后端这一块有点混乱，因而暂时不考虑抽离共用的模块
 * 这一页现在是直接由UserArea复制过来后修改的
 */

class UserAddrArea extends PureComponent {
  static propTypes = {
    changeUserAddr: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      area: [],
      activeProv: null,
      activeCity: null,
    };
  }

  get province() {
    return this.state.area.find(province => province.name === this.state.activeProv);
  }

  get city() {
    return this.province.citys.find(city => city.name === this.state.activeCity);
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

  changeAcitveCity = (name) => {
    const activeCity = (name === this.state.activeCity) ? null : name;
    this.setState({ activeCity });
  }

  isActiveProv = name => name === this.state.activeProv

  isActiveCity = name => name === this.state.activeCity

  selectArea = async (district) => {
    const { changeUserAddr } = this.props;

    changeUserAddr({
      area: {
        province: { name: this.province.name, code: this.province.code },
        city: { name: this.city.name, code: this.city.code },
        district,
      },
    });
    history.back();
  }

  render() {
    return (
      <div>
        <HeaderWithMenu title="城市列表" />

        <h2 className={style.title}>省/市/县列表</h2>
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <ul className={style.provList}>
          {
            this.state.area.map(prov => (
              <li key={prov.code}>
                <div
                  className={style.provItem}
                  data-active={this.isActiveProv(prov.name)}
                  onClick={() => this.changeActiveProv(prov.name)}
                >
                  {prov.name}
                  <svg className={style.icon}><use xlinkHref="#arrow-bottom" /></svg>
                </div>
                <ul className={style.subList}>
                  {
                    prov.citys.map(city => (
                      <li key={city.code}>
                        <div
                          className={style.subItem}
                          data-active={this.isActiveCity(city.name)}
                          onClick={() => this.changeAcitveCity(city.name)}
                        >
                          {city.name}
                          <svg className={style.icon}><use xlinkHref="#arrow-bottom" /></svg>
                        </div>
                        <ul className={style.subList}>
                          {
                            city.districts.map(district => (
                              <li
                                key={district.code}
                                className={style.subItem}
                                onClick={() => this.selectArea(district)}
                              >
                                {district.name}
                                <svg className={style.icon}><use xlinkHref="#arrow-right" /></svg>
                              </li>
                            ))
                          }
                        </ul>
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default UserAddrArea;
