import React from 'react';
import dateFormat from 'dateformat';

import RatingStar from './ratingStar';

const CommentCard = ( { data }) => {
  return (
    <div className='comment-card'>
      <div className='comment-card-inner'>
        <div className='comment-card-who'>
          <div className='comment-image'>
            <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' className='default-image' alt =''/>
            <h5>USER NAME</h5>
          </div>
          <hr />
        </div>
        <div className='comment-card-contents'>
          <div className='comment-card-date'>
            <div className='comment-top'>
              게시일 : {dateFormat(data.comment_update,'yyyy.mm.dd')}
              <span className='star-rating'>
                별점 &nbsp;
                <RatingStar to={data.club_rating} />
              </span>
            </div>
            <hr />
          </div>
          <div className='comment-contents'>
              {data.comment_contents}
          </div>
        </div>
      </div>
    </div>
  );
}

CommentCard.propTypes = {
};

export default CommentCard;
