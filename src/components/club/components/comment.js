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
      start: this.props.start,
    }

    this.setRating = this.setRating.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    console.log('s');
    //Fetch comment Data
    this.props.fetchComment(this.props.club_id, this.state.start, this.props.end );
  }

  handlePageChange(pageNumber){
    console.log(pageNumber);
    console.log(this.state.start);
    let start; //스타트 번호

    //같은 페이지 번호일 경우
    if(pageNumber === this.state.activePage){
      return false;
    }

    start = (pageNumber * 2) - 2 + pageNumber;
    this.props.fetchComment(this.props.club_id, start, this.props.end);

    this.setState({
      ...this.state,
      activePage: pageNumber,
    });
  }

  //댓글 추가시 별 셋팅
  setRating(rate) {
    console.log(rate);
  }

  //댓글 추가
  handleAddComment() {
    //Call API
  }

  render() {
    const comment = () => {
      const results = checkStatusComponent(this.props.comment);
      if(results) {
        const comment = this.props.comment.data;
        let count;

        //데이터가 없을 경우
        if(checkEmptyData(comment)){
          return false;
        }

        //전체 댓글 갯수
        count = comment.count;

        return (
          <div className='comment-list'>
            <ul>
              {comment.rows.map((data, key) => {
                return <li key={key}><CommentCard data={data} /></li>;
              })}
            </ul>
            <div className='pagination'>
              {/* <div className='previous'>이전</div>
              <div className='page-btn'>1</div>
              <div className='page-btn'>2</div>
              <div className='page-btn'>3</div>
              <div className='next'>다음</div> */}
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={3}
                totalItemsCount={count}
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
                    <textarea></textarea>
                    <button onClick={this.handleAddComment}>등록</button>
                  </div>
                  {comment()}
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
