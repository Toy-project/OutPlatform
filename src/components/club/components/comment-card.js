import React from 'react';

import ic_profile from 'images/icons/ic-profile.svg';

const CommentCard = () => (
  <div className='comment-card'>
    <div className='comment-card-inner'>
      <div className='comment-card-who'>
        <div className='comment-image'>
          <img src={ic_profile} alt ='' className='default'/>
          <h5>USER NAME</h5>
        </div>
      </div>
      <div className='comment-card-contents'>
        <div className='comment-card-date'>
          <div className='comment-top'>
            0000-00-00dd
            <span>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
            </span>
          </div>
          <div className='border2'></div>
        </div>
        <div className='border'></div>
        <div className='comment-contents'>
            학생들이 책임 의식을 가지고 아주 잘해주더라구요. 학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.
        </div>
      </div>
    </div>
  </div>
)

CommentCard.propTypes = {
};

export default CommentCard;
