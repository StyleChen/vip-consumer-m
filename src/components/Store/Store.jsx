import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'components';
import style from './store.css';

class Store extends PureComponent {
  static propTypes = {
    geo: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    ddid: PropTypes.number.isRequired,
    stores: PropTypes.arrayOf(PropTypes.object).isRequired,
    getGeo: PropTypes.func.isRequired,
    fetchStores: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { ddid, geo, getGeo, fetchStores } = this.props;
    getGeo();
    fetchStores({ ddid, ...geo });
  }

  componentWillUpdate(nextProps) {
    const { geo: nextGeo } = nextProps;
    const { ddid, geo, fetchStores } = this.props;
    if (nextGeo.x !== geo.x || nextGeo.y !== geo.y) {
      fetchStores({ ddid, ...nextGeo });
    }
  }

  formatDistance = (distance) => {
    if (distance > 1000) {
      return `${(distance / 1000).toFixed(2)}km`;
    }
    return `${distance}m`;
  }

  render() {
    return (
      <div>
        <Header title="门店" />

        <ul className={style.list}>
          {
            this.props.stores.map(store => (
              <li key={store.id} className={style.item}>
                <img className={style.logo} src={store.logo} alt={store.company} />

                <div className={style.content}>
                  <div className={style.title}>
                    <h2 className={style.name}>{store.company}</h2>
                    {/* <span className={style.distance}>
                      {this.formatDistance(store.distance)}</span> */}
                  </div>

                  <div className={style.contact}>
                    <svg className={style.addrIcon}><use xlinkHref="#geo-o" /></svg>
                    <address className={style.addr}>{store.address}</address>
                    <a className={style.phone} href={`tel:${store.phone}`}>
                      <svg className={style.phoneIcon}><use xlinkHref="#phone-2" /></svg>
                    </a>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Store;
