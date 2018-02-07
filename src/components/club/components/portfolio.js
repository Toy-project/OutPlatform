import React from 'react';
import dateFormat from 'dateformat';

class Portfolio extends React.Component {
  constructor(props){
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleEdit() {
    this.props.handleUpdate(this.props.data);
  }

  handleView() {
    this.props.handleView(this.props.data);
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
};

export default Portfolio;
