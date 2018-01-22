import React from 'react';

import ic_profile from 'images/icons/ic-profile.svg';

const CommentCard = () => (
  <div className='comment'>
    <span>
      <img src={ic_profile} alt ='' className='default'/>
      <h5>USER NAME</h5>
    </span>
    <div className='border'></div>
    <span className='comment-top'>
      0000-00-00
      <span>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
      </span>
    </span>
    <div className='border2'></div>
    <span className='comment-contents'>
        학생들이 책임 의식을 가지고 아주 잘해주더라구요. 학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.학생들이 책임 의식을 가지고 아주 잘해주더라구요.
    </span>
  </div>
)

CommentCard.propTypes = {
};

export default CommentCard;
