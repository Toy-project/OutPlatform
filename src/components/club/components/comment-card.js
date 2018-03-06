import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import * as LoginHelper from 'helper/loginHelper';
import RatingStar from './ratingStar';

import * as Comment from 'actions/comment';

class CommentCard extends React.Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment() {
    //to do
    this.props.fetchDeleteComment(this.props.data.club_id, this.props.data.comment_id, this.props.pageNumber);
  }

  render() {
    const option = () => {
      if(this.props.login.loggined) {
        const writer = LoginHelper.isMember(LoginHelper.getCurrentTokenData()) ? LoginHelper.getCurrentTokenData().mem_id : LoginHelper.getCurrentTokenData().club_id;
        if(parseInt(this.props.data.comment_writer, 10) === writer) {
          return (
            <span className='option' onClick={this.deleteComment}>
              삭제
            </span>
          );
        }
      }
    }

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
                게시일 : {dateFormat(this.props.data.comment_update,'yyyy.mm.dd')}
                <span className='star-rating'>
                  별점 &nbsp;
                  <RatingStar to={this.props.data.club_rating} />
                </span>
                {option()}
              </div>
              <hr />
            </div>
            <div className='comment-contents'>
                {this.props.data.comment_contents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentCard.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeleteComment : (club_id, comment_id, pageNumber) => {
      dispatch(Comment.fetchDeleteComment(club_id, comment_id, pageNumber));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);
