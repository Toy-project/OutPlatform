import React from 'react';
import Rating from 'react-rating';
import CommentCard from './comment-card';

class Comment extends React.Component {
  render() {
    let star_rating = 0;
    const changeRating = (rate) => {
      star_rating = rate;
    }
    return (
      <div className='comment-container'>
        <div className='container'>
          <div className='comment-inner'>
            <div className='title-wrapper'>
              <span></span>
              <h3>단체 평가</h3>
            </div>
            <div className='comment-wrapper'>
              <div className='comment'>
                <div className='comment-top'>
                  <h4>평균 별점</h4>
                  <span className='star-rating'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </span>
                  <h4>평가 갯수</h4>
                  <h5>000회</h5>
                </div>
                <div className='comment-create'>
                  <div className='star-rating'>
                    <span>
                      <Rating
                        emptySymbol='fa fa-star full'
                        fullSymbol='fa fa-star full isHover'
                        onChange={changeRating}
                      />
                    </span>
                  </div>
                  <textarea></textarea>
                  <button>등록</button>
                </div>

                <div className='comment-list'>
                  <ul>
                    <li><CommentCard /></li>
                    <li><CommentCard /></li>
                    <li><CommentCard /></li>
                  </ul>
                  <div className='pagination'>
                    <div className='previous'>이전</div>
                    <div className='page-btn'>1</div>
                    <div className='page-btn'>2</div>
                    <div className='page-btn'>3</div>
                    <div className='next'>다음</div>
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

export default Comment;
