import React from 'react';

import './scss/index.scss';
import { Nav } from '../';

import ic_magnifier from '../../images/icons/ic-magnifier.svg';

class Header extends React.Component {
  render(){
    return (
      <div className="top-container">
        <div className="container">
          <Nav />
          <div className="header-contents-container">
            <h1>외주 대학교</h1>
            <p>
              가치와 가치의 뜻있는 연결, 대학생은 서투르고
              프로답지 못하다는 예상을 깨볼까요?:)
            </p>
            <form>
              <div className="input-field">
                <label htmlFor="search">
                  <i><img src={ic_magnifier} alt='' /></i>
                </label>
                <input type="text" id="search" placeholder='ex) 동아리명, 카테고리' />

              </div>
            </form>
            <pre>
              외주 견적 문의 <br />
              130  회
            </pre>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
