import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'components';
import CardItem from './CardItem';
import style from './card-list.css';

class CardList extends PureComponent {
  static propTypes = {
    geo: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    resetState: PropTypes.func.isRequired,
    getGeo: PropTypes.func.isRequired,
    fetchCards: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { geo, getGeo, fetchCards, resetState } = this.props;
    resetState();
    getGeo();
    fetchCards(geo);
  }

  componentWillUpdate(nextProps) {
    const { x: nextX, y: nextY } = nextProps.geo;
    const { x, y } = this.props.geo;
    if (nextX !== x || nextY !== y) {
      this.props.fetchCards(nextProps.geo);
    }
  }

  render() {
    return (
      <div>
        <Header title="会员卡" to="#" />

        <ul className={style.list}>
          {this.props.cards.map(card => (
            <CardItem key={card.ddid} {...card} />
          ))}
        </ul>
      </div>
    );
  }
}

export default CardList;
