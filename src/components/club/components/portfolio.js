import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import { fetchDeleteCareer } from 'actions/portfolio';

class Portfolio extends React.Component {
  constructor(props){
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleView = this.handleView.bind(this);

    this.removeItem = this.removeItem.bind(this);
  }

  handleEdit() {
    this.props.handleUpdate(this.props.data);
  }

  handleView() {
    this.props.handleView(this.props.data);
  }

  removeItem() {
    this.props.fetchDeleteCareer(this.props.data.club_id, this.props.data.career_id);
  }

  render() {
    let isButton;

    if(this.props.myPage){
      isButton = (
        <div className='portfolio-edit-btn'>
          <button onClick={this.handleEdit}>수정</button>
        </div>
      );
    } else {
      isButton = (
        <div className='portfolio-view-btn'>
          <button onClick={this.handleView}>더 보기</button>
        </div>
      );
    }
    return (
      <div className='portfolio-card'>
        <div className='remove-btn' onClick={this.removeItem}>
          <span className='x-icon'></span>
        </div>
        <div className='card-image'>
          <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
        </div>
        <div className='card-content-container'>
          <section>
            <h4>{this.props.data.career_name}</h4>
            <h5>
              {dateFormat(this.props.data.career_due_start,'yyyy.mm.dd')} - {dateFormat(this.props.data.career_due_end,'yyyy.mm.dd')}
            </h5>
          </section>
          <p>
            {this.props.data.career_ex}
          </p>
          {isButton}
        </div>
      </div>
    );
  }
}

Portfolio.propTypes = {
  data : PropTypes.shape({
    career_id: PropTypes.number,
    career_name: PropTypes.string,
    career_ex: PropTypes.string,
    career_photo: PropTypes.string,
    career_due_start: PropTypes.date,
    career_due_end: PropTypes.date,
    career_people: PropTypes.number,
    club_id: PropTypes.number,
  })
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeleteCareer : (club_id, career_id) => {
      return dispatch(fetchDeleteCareer(club_id, career_id));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
