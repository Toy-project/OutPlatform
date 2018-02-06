import React from 'react';

import ic_profile from 'images/icons/ic-profile.png';

import RatingStar from './ratingStar';

const CommentCard = ( { data }) => {
  const date = data.comment_update.replace(/-/gi,'/');
  return (
    <div className='comment-card'>
      <div className='comment-card-inner'>
        <div className='comment-card-who'>
          <div className='comment-image'>
            <img src={ic_profile} alt ='' className='default'/>
            <h5>USER NAME</h5>
          </div>
          <hr />
        </div>
        <div className='comment-card-contents'>
          <div className='comment-card-date'>
            <div className='comment-top'>
              게시일 : {date}
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
