import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getClubLists } from '../../../services/card/';
import { addCards } from '../../../actions/card/';
import '../scss/index.scss';
import { Card } from '../../';

let paginationStart = 0;
const paginationCount = 6;

class CardsList extends React.Component {
  constructor(props){
    super(props);

    //SetState binding
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  initData() {
      const res = getClubLists(paginationStart, paginationCount);

      //Add Data
      res.then((data) => {
        data.map((item, key) => {
          return this.props.addCard(item);
        });
      });
  }

  componentDidMount() {
    this.initData()
    //Add scroll Event
    window.addEventListener('scroll', this.handleOnScroll("cardsList"));
  }

  componentWillUnmount() {
    //Remove scroll event
    window.removeEventListener('scroll', this.handleOnScroll("cardsList"));
  }

  loadingData() {
    paginationStart += 6; //페이징 시작 점을 증가
    const res = getClubLists(paginationStart, paginationCount);

    //Add Data
    res.then((data) => {
      data.map((item, key) => {
        return this.props.addCard(item);
      });
    });
  }

  handleOnScroll = (id) => (e) => {
    //get windowHeight without toolbar and status bar
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;

    //get offsetTop and offSetHeight of CardsList
    const offSetTopOfCardsList = document.getElementById(id).offsetTop;
    const offSetheightOfCardsList = document.getElementById(id).offsetHeight;

    const windowBottom = windowHeight + window.pageYOffset;
    const cardsListBottom = offSetTopOfCardsList + offSetheightOfCardsList;

    //스크롤이 리스트의 끝을 지날 때 데이터 로딩
    if(windowBottom >= cardsListBottom){
      this.loadingData();
    }
  }

  render() {

    return (
      <div>
        <ul id="cardsList" className="center">
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
      </div>
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
