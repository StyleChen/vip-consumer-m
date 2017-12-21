import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ctns from 'containers';
import style from './app.css';

class App extends PureComponent {
  static propTypes = {
    menu: PropTypes.bool.isRequired,
    getGeo: PropTypes.func.isRequired,
    hideMenu: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getGeo();
  }

  hideMenu = () => {
    const { menu, hideMenu } = this.props;
    if (menu) {
      hideMenu();
    }
  }

  render() {
    return (
      <Router basename="/erp/vipbuyer">
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <div className={style.app} onClick={this.hideMenu}>
          <Route path="/" component={ctns.CardList} exact />
          <Route path="/card/:ddid" component={ctns.Card} exact />
          <Route path="/card/:ddid/scan" component={ctns.Scan} />

          <Route path="/store" component={ctns.Store} />

          <Route path="/coupon/:type" component={ctns.Coupon} />

          <Route path="/point" component={ctns.Point} />
          <Route path="/point-detail/:id" component={ctns.PointDetail} />
          <Route path="/point-convert" component={ctns.PointConvert} />

          <Route path="/user" component={ctns.UserInfo} />
          <Route path="/user-phone" component={ctns.UserPhone} />
          <Route path="/user-area" component={ctns.UserArea} />
          <Route path="/user-area-lock" component={ctns.UserAreaLock} />
          <Route path="/user-password" component={ctns.UserPassword} />
          <Route path="/user-number" component={ctns.UserNumber} />
          <Route path="/user-addr" component={ctns.UserAddr} exact />
          <Route path="/user-addr/:id" component={ctns.UserAddrDetail} />
          <Route path="/user-addr-area" component={ctns.UserAddrArea} />
          <Route path="/user-change-pwd" component={ctns.UserChangePassword} />

          <Route path="/topup" component={ctns.TopUp} />

          <Route path="/bill/:type" component={ctns.Bill} />

          <Route path="/order-list/:type" component={ctns.OrderList} />
          <Route path="/order-detail/:orderNumber" component={ctns.OrderDetail} />
          <Route path="/logistics/:shipperCode/:logisticCode" component={ctns.Logistics} />

          <Route path="/loss" component={ctns.Loss} />
          <Route path="/collection" component={ctns.Collection} />
          <Route path="/vip-book" component={ctns.VipBook} />
        </div>
      </Router>
    );
  }
}

export default App;
