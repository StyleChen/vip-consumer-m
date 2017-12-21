import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CardList } from 'components';
import { resetState } from 'redux/modules/global';
import { getGeo } from 'redux/modules/geo';
import { fetchCards } from 'redux/modules/cards';

const CardListContainer = connect(
  ({ geo, cards }) => ({ geo, cards }),
  dispapth => bindActionCreators({
    resetState,
    getGeo,
    fetchCards,
  }, dispapth),
)(CardList);

export default CardListContainer;
