import React from 'react';
import '../scss/mainViewList.scss';

import Card from '../../card/';

import { connect } from 'react-redux';

const CardsList = ({ cards }) => (
  <ul className="center">
    {cards.map( (card, key) => {
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

CardsList.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardsList);
