import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import Pagination from "react-js-pagination";

import CommentCard from './comment-card';
import RatingStar from './ratingStar';

import { checkStatusComponent, checkEmptyData } from 'helper/common';
import * as LoginHelper from 'helper/loginHelper';
import * as Common from 'helper/common';
import { commentListEnd } from 'helper/variables';

import * as Services from 'actions/comment';

class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1,
    }

    this.setRating = this.setRating.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
  }

  handlePageChange(pageNumber){
    let start; //스타트 번호

    //같은 페이지 번호일 경우
    if(pageNumber === this.state.activePage){
      return false;
    }

    //Data Fetch
    start = (pageNumber * 2) - 3 + pageNumber;

    this.props.fetchComment(this.props.club_id, start, commentListEnd);

    this.setState({
      ...this.state,
      activePage: pageNumber,
    });
  }

  //댓글 추가시 별 셋팅
  setRating(rate) {
    //Set rating value to hidden input
    this.refs.club_raing.value = rate;
  }

  //댓글 추가
  handleAddComment() {
    //로그인이 안되어 있을 경우
    if(LoginHelper.getCurrentToken() === false) {
      alert('로그인 후에 이용해주세요!');
      return false;
    }

    const rating = this.refs.club_raing.value;
    const comment_writer = LoginHelper.isMember(LoginHelper.getCurrentToken()) ? LoginHelper.getCurrentToken().mem_id : LoginHelper.getCurrentToken().club_id;
    const comment_writer_type = LoginHelper.isMember(LoginHelper.getCurrentToken()) ? 'member' : 'club';
    const data = {
      'comment_contents': this.refs.comment_contents.value,
      'comment_writer': comment_writer,
      'comment_writer_type': comment_writer_type,
      'club_rating': Common.isEmpty(rating) ? 0 : rating,
      'club_id': this.props.club_id,
    }

    //Call Post API
    this.props.fetchCreateComment(data);
  }

  componentDidMount() {
    this.props.fetchComment(this.props.club_id, 0, commentListEnd);
  }

  render() {
    const comment = () => {
      const results = checkStatusComponent(this.props.comment);
      if(results) {
        const comment = this.props.comment.data;

        //데이터가 없을 경우
        if(checkEmptyData(comment)){
          return false;
        }

        if(comment.count === 0) {
          return (
            <span>
              댓글을 입력해주세요!
            </span>
          )
        } else {
          return (
            <ul>
              {comment.rows.map((data, key) => {
                return <li key={key}><CommentCard data={data} /></li>;
              })}
            </ul>
          );
        }
      }
    }

    return (
      <div className='comment-container'>
        <div className='container'>
          <div className='comment-inner'>
            <div>
              <div className='title-wrapper'>
                <span></span>
                <h3>단체 평가</h3>
              </div>
              <div className='comment-wrapper'>
                <div className='comment'>
                  <div className='comment-top'>
                    <h4>평균 별점</h4>
                    <span className='star-rating'>
                      <RatingStar to={parseInt(Math.ceil(this.props.comment.data.club_rating_avg), 10)} />
                    </span>
                    <h4>평가 갯수</h4>
                    <h5>000회</h5>
                  </div>
                  <div className='comment-create'>
                    <div className='star-rating'>
                      <span>
                        <Rating
                          emptySymbol='fa fa-star basic'
                          fullSymbol='fa fa-star basic _fill'
                          onChange={this.setRating}
                        />
                      </span>
                    </div>
                    <textarea ref='comment_contents'></textarea>
                    <button onClick={this.handleAddComment}>등록</button>
                    <input type='hidden' ref='club_raing'></input>
                  </div>
                  <div className='comment-list'>
                    {comment()}
                    <div className='pagination'>
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={this.props.comment.data.count}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        prevPageText={'이전'}
                        nextPageText={'다음'}
                        linkClassPrev={'previous'}
                        linkClassNext={'next'}
                        getPageUrl={this.getPageUrl}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    comment: state.comment,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComment: (index, start, end) => {
      dispatch(Services.fetchComment(index, start, end));
    },
    fetchCreateComment : (data) => {
      dispatch(Services.fetchCreateComment(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
