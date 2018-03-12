import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import '../scss/index.scss';

import * as Services from 'actions/card';

import * as Common from 'helper/common';
import { cardListEnd } from 'helper/variables';

import { Card, InnerError, InnerLoading } from 'components/';
import MessagePopup from 'components/messagePopup';

class CardsList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //카트 로딩
      isLoading: false,

      //카트 완료 메세지
      messagePopup: false,
    }

    //SetState binding
    this.loadingData = this.loadingData.bind(this);
    this.isLoadingToggle = this.isLoadingToggle.bind(this);

    //카트 완료 메세지
    this.messagePopup = this.messagePopup.bind(this);
  }

  messagePopup() {
    this.setState({
      messagePopup: !this.state.messagePopup,
    });
  }

  loadingData() {
    //카테고리로 서치할 때
    if(this.props.cards.byCateId) {
      this.props.fetchCardsByCateId(this.props.cards.cate_id, this.props.cards.start, cardListEnd);
    } else {
      this.props.fetchCards(this.props.cards.start, cardListEnd);
    }
  }

  isLoadingToggle() {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  render() {
    let club_count = this.props.cards.count;

    //카트 담기 로딩
    let loadingForCart = (
      <div className='global-loading fixed'>
        <InnerLoading loading={true} />
      </div>
    );

    //카트 완료 메세지
    const messagePopupForCart = (
      <MessagePopup close={this.messagePopup} msg={'장바구니에 담겼습니다.'} />
    );

    const card = () => {
      if(Common.isLoading(this.props.cards)) {
        return (
          <div className='global-loading'>
            <InnerLoading loading={this.props.cards.isLoading} />
          </div>
        );
      }

      if(Common.isError(this.props.cards)){
        return (
          <div className='global-error'>
            <InnerError component={'단체'} />
          </div>
        );
      }

      const card = this.props.cards.data;

      if(Common.checkEmptyData(card)){
        return false;
      }

      return card.map( (card, key) => {
        return (
          <li key={key}>
            <Card
              data = {card}
              loadingForCart = {this.isLoadingToggle}
              messagePopupForCart = {this.messagePopup}
            />
          </li>
        );
      });
    }

    const endMessage = () => {
      if(!this.props.cards.isLoading && !this.props.cards.error) {
        return (
          <div className='end-message'>
            등록된 단체를 다 보셨습니다! <br />
            마음에 드시는 단체는 찾으셨나요?:)
          </div>
        );
      }
    }

    return (
      <div>
        <div className='card-total-number'>
          등록된 단체 수 : {club_count}
        </div>
        <ul>
          <InfiniteScroll
            next={this.loadingData}
            hasMore={this.props.cards.hasMore}
            endMessage={endMessage()}>
            {card()}
          </InfiniteScroll>
        </ul>
        {/* 카트 로딩 */}
        {this.state.isLoading ? loadingForCart : ''}
        {this.state.messagePopup ? messagePopupForCart : ''}
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
    cart: state.cart,
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CardsList));
