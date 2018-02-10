import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

class TypeOfClubSelection extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const id = e.target.id;
    const element = document.getElementById(id);
    const error = document.getElementById('option_context');
    const selectedId = this.isSelected();

    error.innerHTML = '단체를 선택하셨습니다.';
    error.className = '';

    if(selectedId === -1){
      element.className = 'circle selected';
    } else {
      //현재 selected를 해제하고 현재 선택된 엘리먼트에 selected 추가
      document.getElementById(selectedId).className = 'circle';
      element.className = 'circle selected';
    }
  }

  isSelected() {
    const spans = document.querySelectorAll('.type-of-Club-Selection-inner span');
    let id = -1;
    spans.forEach((span) => {
      if(span.className.indexOf('selected') !== -1){
        id = span.id;
      }
    });

    return id;
  }

  handleSubmit(e) {
    e.preventDefault();

    const element = document.getElementById('option_context');
    let type = this.isSelected();

    if(type !== -1) {
      type = type.substring('option'.length);
      this.props.history.push(`/register/${type}`);
      window.location.reload();
    } else {
      element.innerHTML = '단체를 선택해주세요.';
      element.className = 'error';
    }
  }

  render() {

    return (
      <div className='type-of-Club-Selection-container'>
        <div className='type-of-Club-Selection-inner'>
          <h3>단체회원가입</h3>
          <p id="option_context">
            어떤 단체이신가요?
          </p>
          <ul>
            <li><span id="option1" onClick={this.handleChange} className="circle">동아리</span></li>
            <li><span id="option2" onClick={this.handleChange} className="circle">학회</span></li>
            <li><span id="option3" onClick={this.handleChange} className="circle">소모임</span></li>
          </ul>
          <button onClick={this.props.toggleToBack} className="gray-btn left">이전</button>
          <button onClick={this.handleSubmit} className="emerald-btn">확인</button>
        </div>
      </div>
    );
  }
}

TypeOfClubSelection.propTypes = {
  toggleToBack: PropTypes.func,
};

export default withRouter(TypeOfClubSelection);
