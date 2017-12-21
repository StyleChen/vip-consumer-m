import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { HeaderWithMenu, MainButton } from 'components';
import style from './point-detail.css';

class PointDetail extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    ddid: PropTypes.number.isRequired,
    pointDetail: PropTypes.shape({
      ddid: PropTypes.number,
      stock: PropTypes.number,
      imgs: PropTypes.string, /* 暂时只有一张，后台返回一个字符串以后改成数组 */
      name: PropTypes.string,
      money: PropTypes.number,
      body: PropTypes.string,
    }).isRequired,
    fetchPointDetail: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { fetchPointDetail, ddid, match } = this.props;
    fetchPointDetail({ ddid, id: match.params.id });
  }

  convertAtOnce = () => {
    this.props.history.push('/point-convert');
  }

  render() {
    const { body, imgs, name, money } = this.props.pointDetail;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        <HeaderWithMenu title="积分商品详情" />

        <section className={style.detail}>
          <Slider {...settings}>
            {
              imgs.map(img => (
                <div className={style.imgBox}>
                  <img className={style.imgBoxImg} src={img} alt={name} />
                </div>
              ))
            }
          </Slider>
          <h1 className={style.title}>{name}</h1>
          <div className={style.number}>
            <span className={style.big}>{money}</span>积分
          </div>
        </section>

        <section className={style.info}>
          <h3 className={style.infoTitle}>商品介绍</h3>
          {/* eslint-disable react/no-danger */}
          <div className={style.input} dangerouslySetInnerHTML={{ __html: body }} />
        </section>

        <div className={style.bottom}>
          <MainButton text="立即兑换" action={this.convertAtOnce} />
        </div>

      </div>
    );
  }
}

export default PointDetail;
