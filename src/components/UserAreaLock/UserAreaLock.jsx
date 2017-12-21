/* globals BMap */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './user-area-lock.css';


class UserAreaLock extends PureComponent {
  static sharedPropTypes = PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    // eslint-disable-next-line
    userAddr: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      mobile: PropTypes.string,
      area: PropTypes.shape({
        province: UserAreaLock.sharedPropTypes,
        city: UserAreaLock.sharedPropTypes,
        district: UserAreaLock.sharedPropTypes,
      }),
      address: PropTypes.string,
      isDefault: PropTypes.bool,
      title: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    changeUserAddr: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      searchBool: false,
      point: {},
      list1: [],
      list2: [],
    };
    this.toSearchPage = this.toSearchPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changePoint = this.changePoint.bind(this);
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    const { province, city, district } = this.props.userAddr.area;
    const address = province.name + city.name + district.name + this.props.userAddr.title;
    // eslint-disable-next-line
    await this.setState({ map: new BMap.Map(this.map) });
    this.state.map.enableScrollWheelZoom(true);
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(address, (p) => {
      if (p) {
        this.setState({ point: p });
        this.state.map.centerAndZoom(p, 18);
        this.state.map.addOverlay(new BMap.Marker(p));
        const that = this;
        // 周边搜索
        myGeo.getLocation(p, (result) => {
          const pois = result.surroundingPois;
          that.setState({ list1: pois });
        }, {
          poiRadius: 500,  // 检索范围，单位：米
          numPois: 10,  // 返回的POI点个数
        });
      } else {
        alert('您选择地址没有解析到结果!');
      }
    }, `${city.name}市`);

    // 添加定位控件
    this.addLocationControl();
  }

  handleClick(e) {
    this.props.changeUserAddr({
      address: e.currentTarget.getAttribute('data-address'),
      title: e.currentTarget.getAttribute('data-title'),
      x: e.currentTarget.getAttribute('data-x'),
      y: e.currentTarget.getAttribute('data-y'),
    });
    this.props.history.push(`/user-addr/${this.props.userAddr.id}`);
  }

  addLocationControl() {
    const geolocationControl = new BMap.GeolocationControl({
      // eslint-disable-next-line
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    });
    geolocationControl.addEventListener('locationSuccess', (e) => {
      // 定位成功事件
      let localAddress = '';
      localAddress += e.addressComponent.province;
      localAddress += e.addressComponent.city;
      localAddress += e.addressComponent.district;
      localAddress += e.addressComponent.street;
      localAddress += e.addressComponent.streetNumber;
      alert(`当前定位地址为：${localAddress}`);
      this.changePoint(e.point);
    });
    geolocationControl.addEventListener('locationError', (e) => {
    // 定位失败事件
      alert(e.message);
    });
    this.state.map.addControl(geolocationControl);
  }

  async changePoint(pt) {
    await this.setState({
      point: {
        lng: pt.lng,
        lat: pt.lat,
      },
    });
    const geocoder = new BMap.Geocoder();
    geocoder.getLocation(pt, (result) => {
      this.state.map.centerAndZoom(pt, 18);
      this.state.map.addOverlay(new BMap.Marker(pt));
      const pois = result.surroundingPois;
      this.setState({ list1: pois });
    }, {
      poiRadius: 500,  // 检索范围，单位：米
      numPois: 10,  // 返回的POI点个数
    });
  }

  toSearchPage() {
    this.setState({
      searchBool: true,
    });
  }

  search(e) {
    e.persist();
    const keyword = e.currentTarget.value;
    this.setState({ keyword });
    const map = this.state.map;
    const that = this;
    const point = new BMap.Point(this.state.point.lng, this.state.point.lat);
    const local = new BMap.LocalSearch(point, {
      renderOptions: { map, autoViewport: true },
      onSearchComplete(result) {
        that.setState({
          list2: result.vr,
        });
      },
    });
    local.searchNearby(keyword, point);
  }

  render() {
    const { list1, list2 } = this.state;
    return (
      <div>
        <div className={style.lockHeader}>
          <div className={style.searchWrapper}>
            <svg className={style.icon} >
              <use xlinkHref="#search" />
            </svg>
            <input type="search" className={style.searchInput} placeholder="请输入搜索的内容" form="form" onFocus={this.toSearchPage} onChange={this.search} />
          </div>
          <div className={style.cancel} hidden={!this.state.searchBool} onClick={() => { this.setState({ searchBool: false }); }}>取消</div>
        </div>
        <div className={style.content} hidden={this.state.searchBool}>
          <div className={style.mapWrapper} ref={(ref) => { this.map = ref; }} />
          <ul className={style.addrList}>
            {
            list1.map((item, index) => (
              <li
                className={style.addrItem}
                data-x={item.point.lng}
                data-y={item.point.lat}
                data-title={item.title}
                data-address={item.address}
                onClick={this.handleClick}
              >
                <h2 className={style.itemTitle}>
                  {
                    index === 0 ? <span>[当前位置]</span> : null
                  }
                  {item.title}</h2>
                <p className={style.itemAddr}>{item.address}</p>
              </li>
            ))
          }
          </ul>
        </div>
        {
          this.state.searchBool && this.state.keyword ? (<ul className={`${style.addrList} ${style.searchList}`}>
            {
            list2.map(item => (
              <li
                className={style.addrItem}
                data-title={item.title}
                data-address={item.address}
                data-x={item.point.lng}
                data-y={item.point.lat}
                onClick={this.handleClick}
              >
                <h2 className={style.itemTitle}>{item.title.split(this.state.keyword)[0]}<span>{this.state.keyword}</span>{item.title.split(this.state.keyword)[1]}</h2>
                <p className={style.itemAddr}>{item.address}</p>
              </li>
            ))
          }
          </ul>) : null
        }
      </div>
    );
  }
}

export default UserAreaLock;
