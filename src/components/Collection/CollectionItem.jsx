import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import style from './collection.css';

class CollectionItem extends PureComponent {
  static propTypes = {
    image: PropTypes.string.isRequired,
    scid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    showModal: PropTypes.func.isRequired,
    getModal: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.addToCart(this.props.scid);
  }

  handleDelete() {
    this.props.showModal();
    this.props.getModal(this.props.scid);
  }

  render() {
    const { image, scid, name, price } = this.props;
    return (
      <section
        className={`mui-table-view-cell ${style.listWrapper}`}
      >
        <div className={`${style.info} mui-slider-handle`}>
          <a className={style.pic} href={`http://www.mengyunjie.com/m/shop/${scid}`}>
            <img src={image} alt={name} />
          </a>

          <div className={style.text} onClick={() => { location.href = `http://www.mengyunjie.com/m/shop/${scid}`; }}>
            <h3 className={style.name}>{name}</h3>

            <p className={style.price}>
              <span >￥{price}</span>
              <div className={style.add} onClick={this.handleClick}>加入购物车</div>
            </p>

          </div>
        </div>
        <div className="mui-slider-right mui-disabled">
          <a className="mui-btn mui-btn-red" onClick={() => { this.handleDelete(); }}>删除</a>
        </div>
      </section>
    );
  }
}
export default CollectionItem;
