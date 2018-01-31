import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/index.scss';

import { fetchCards } from 'actions/card';

// import { getClubLists } from 'services/card/';
import { Card } from 'components/';

let paginationStart = 0;
const paginationCount = 6;

class CardsList extends React.Component {
  constructor(props){
    super(props);

    //SetState binding
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    //Add scroll Event
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    //Remove scroll event
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  loadingData() {
    //데이터를 로딩중이거나 Error 일 경우는 그냥 리턴
    if(this.props.cards.isLoading || this.props.cards.error){
      return false;
    }

    paginationStart += 6; //페이징 시작 점을 증가

    //Get Data
    this.props.fetchCards(paginationStart, paginationCount);
  }

  handleOnScroll() {
    //get windowHeight without toolbar and status bar
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;

    //get offsetTop and offSetHeight of CardsList
    const offSetTopOfCardsList = document.getElementById("cardsList").offsetTop;
    const offSetheightOfCardsList = document.getElementById("cardsList").offsetHeight;

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
          {this.props.cards.isLoading ? 'Loading' : ''}
          {this.props.cards.error ? 'Error' : ''}
          {this.props.cards.data.map( (card, key) => {
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
  cards: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      club_profile_photo : PropTypes.string,
      club_name : PropTypes.string,
      club_ex : PropTypes.string,
      club_rating : PropTypes.float,
    })),
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    Error: PropTypes.bool,
  })
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCards: (start, count) => {
      dispatch(fetchCards(start, count));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardsList);
