import React from 'react';
import '../../scss/common.scss';
import './scss/clubList.scss';
import './js/clubList.js';

class ClubList extends React.Component {
  render(){
    return (
      <div className="container">
        <div className="section">
          <div class="row">
            <div class="center">
              <h4>Contact Us</h4>
              <p class="center-align   light">
                가치와 가치의 뜻있는 연결, 대학생은 서투르고 프로답지 못하다는 예상을 깨볼까요?:)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClubList;
