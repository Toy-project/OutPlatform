import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import Pagination from "react-js-pagination";

import CommentCard from './comment-card';
import RatingStar from './ratingStar';

import { checkStatusComponent, checkEmptyData } from 'helper/clubHelper';

import { fetchComment } from 'actions/comment';

class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1,
      updatedCommentId: -1,
    }

    this.setRating = this.setRating.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);

    //Fetch comment Data
    this.props.fetchComment(this.props.club_id, this.props.start, this.props.end );
  }

  handlePageChange(pageNumber){
    let start; //스타트 번호

    //같은 페이지 번호일 경우
    if(pageNumber === this.state.activePage){
      return false;
    }

    //Data Fetch
    start = (pageNumber * 2) - 2 + pageNumber;
    this.props.fetchComment(this.props.club_id, start, this.props.end);

    this.setState({
      ...this.state,
      activePage: pageNumber,
    });
  }

  //댓글 추가시 별 셋팅
  setRating(rate) {
    //Set rating value to hidden input
    const element = document.getElementById('hiddenRatingValue');
    element.value = rate;
  }

  //댓글 추가
  handleAddComment() {
    const rating = document.getElementById('hiddenRatingValue').value;
    const data = {
      'comment_contents': this.refs.comment_contents.value,
      'club_rating': rating,
      // 'club_id':
      // 'mem_id':
    }
    let updatedCommentId;

    //Call Post API
    //updatedCommentId = APICALL
    this.setState({
      ...this.state,
      updatedCommentId: updatedCommentId,
    });

    //Fetch Data
    this.props.fetchComment(this.props.club_id, this.props.start, this.props.end);
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

        return (
          <ul>
            {comment.rows.map((data, key) => {
              if(this.state.updatedCommentId === data.comment_id){
                //애니메이션 추가
              }
              return <li key={key}><CommentCard data={data} /></li>;
            })}
          </ul>
        );
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
                      <RatingStar to={this.props.club_rating} />
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
                    <input type='hidden' id='hiddenRatingValue'></input>
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
      dispatch(fetchComment(index, start, end));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
