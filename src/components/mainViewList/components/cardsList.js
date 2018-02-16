import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import '../scss/index.scss';

import * as Services from 'actions/card';

import { checkStatusComponent, checkEmptyData } from 'helper/common';
import { cardListEnd } from 'helper/variables';
import { Card } from 'components/';

class CardsList extends React.Component {
  constructor(props){
    super(props);

    //SetState binding
    this.loadingData = this.loadingData.bind(this);
  }

  loadingData() {
    console.log(this.props.cards.start);
    //카테고리로 서치할 때
    if(this.props.cards.byCateId) {
      this.props.fetchCardsByCateId(this.props.cards.cate_id, this.props.cards.start, cardListEnd);
    } else {
      this.props.fetchCards(this.props.cards.start, cardListEnd);
    }
  }

  render() {
    let club_count = this.props.cards.count;
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

    const endMessage = (
      <div className='end-message'>
        등록된 단체를 다 보셨습니다! <br />
        마음에 드시는 단체는 찾으셨나요?:)
      </div>
    )

    return (
      <div>
        <div className='card-total-number'>
          등록된 단체 수 : {club_count}
        </div>
        <ul>
          <InfiniteScroll
            next={this.loadingData}
            hasMore={this.props.cards.hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={endMessage}>
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
      dispatch(Services.fetchCards(start, count));
    },
    fetchCardsByCateId: (cate_id, start, end) => {
      dispatch(Services.fetchCardsByCateId(cate_id, start, end));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardsList);
