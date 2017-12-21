import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './point-item.css';

class PointItem extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.bool, // 是否热门
    state: PropTypes.string,
    children: PropTypes.element,
  }

  static defaultProps = {
    type: false,
    state: null,
    children: null,
  }

  render() {
    return (
      <Link className={style.item} to={`/point-detail/${this.props.id}`}>
        <img className={style.pic} src={this.props.img} alt={this.props.name} />

        <div className={style.content}>
          <h3 className={this.props.type ? style.titleHot : style.title}>
            {this.props.name}
          </h3>
          <div>{this.props.desc}</div>
          {this.props.children}
        </div>

        <div className={style.state} hidden={!this.props.state}>
          {this.props.state}
        </div>
      </Link>
    );
  }
}

export default PointItem;
