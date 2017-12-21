import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HeaderWithMenu } from 'components';
import CardInfo from './CardInfo';
import CardPortal from './CardPortal';

class Card extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        ddid: PropTypes.string,
      }),
    }).isRequired,
    card: PropTypes.shape({
      company: PropTypes.string,
      czstate: PropTypes.number,
      phone: PropTypes.string,
      vipstate: PropTypes.number,
    }).isRequired,
    fetchCard: PropTypes.func.isRequired,
    changeMoneyShowState: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { fetchCard, match } = this.props;
    fetchCard(match.params.ddid);
  }

  render() {
    // eslint-disable-next-line
    const { czstate, phone, vipstate, ...others } = this.props.card;
    if (location.search.includes('hotel')) {
      return (
        <div>
          <CardPortal czstate={czstate} phone={phone} />
        </div>
      );
    }

    return (
      <div>
        <HeaderWithMenu title={this.props.card.company} to="/" />

        { this.props.card.vipstate === 1 ?
          <CardInfo {...others} changeMoneyShowState={this.props.changeMoneyShowState} /> : null
        }
        <CardPortal czstate={czstate} phone={phone} vipstate={vipstate} />
      </div>
    );
  }
}

export default Card;
