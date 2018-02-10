import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import '../scss/index.scss';

import { fetchCards } from 'actions/card';

import { checkStatusComponent, checkEmptyData } from 'helper/clubHelper';

// import { getClubLists } from 'services/card/';
import { Card } from 'components/';

let paginationStart = 0;
const paginationCount = 12;

class CardsList extends React.Component {
  constructor(props){
    super(props);

    //SetState binding
    this.loadingData = this.loadingData.bind(this);
  }

  loadingData() {
    paginationStart += 12;
    this.props.fetchCards(paginationStart, paginationCount);
  }

  render() {
    const card = () => {
      if(!checkStatusComponent(this.props.cards)){
        //로딩이나 에러
      } else {
        const card = this.props.cards.data;

        if(checkEmptyData(card)){
          return false;
        }

        return card.map( (card, key) => {
          return (
            <li key={key}>
              <Card
                {...card}
              />
            </li>
          );
        });
      }
    }
    return (
      <div>
        <ul id="cardsList" className="center">
          <InfiniteScroll
            next={this.loadingData}
            hasMore={this.props.cards.hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Yay!   You have seen it all</b>
              </p>
            }>
            {card()}
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
}

CardsList.propTypes = {
  cards: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      club_id : PropTypes.number,
      club_name : PropTypes.string,
      club_copyright : PropTypes.string,
      club_rating : PropTypes.float,
      club_profile_photo : PropTypes.string,
      cate_id: PropTypes.number,
      tag_id: PropTypes.number,
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
