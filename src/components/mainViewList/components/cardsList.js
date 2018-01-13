import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCards } from '../../../actions/card/';
import '../scss/index.scss';
import Card from '../../card/';
import { apiAddres } from '../../../helper/variables';

const urlGetAllClubLists = `${apiAddres}/club`;

class CardsList extends React.Component {
  componentDidMount() {
    fetch(urlGetAllClubLists)
      .then((response) => {
        response.json().then((datas) => {
          datas.map((data, key) => {
            return this.props.addCard(data);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <ul className="center">
        {this.props.cards.map( (card, key) => {
          return (
            <li key={key}>
              <Card
                {...card}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

CardsList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      club_profile_photo: PropTypes.string,
      club_name: PropTypes.string,
      club_ex: PropTypes.string,
      club_rating: PropTypes.number,
  })),
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (cardInfo) => {
      dispatch(addCards(cardInfo.club_profile_photo, cardInfo.club_name, cardInfo.club_ex, cardInfo.club_rating));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardsList);
