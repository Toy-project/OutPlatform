import React from 'react';
import Scroll from 'react-scroll-to-element';

import './scss/index.scss';
import { Nav } from 'components/';

import ic_magnifier from 'images/icons/ic-magnifier.svg';

import ic_under_arrow from 'images/icons/ic-under-arrow.svg';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      containerHeight: 0,
    }
    this.onClickArrowToBottom = this.onClickArrowToBottom.bind(this);
  }

  componentDidMount() {
    window.onload = () => {
      this.onClickArrowToBottom();
    }

    window.addEventListener('resize', this.onClickArrowToBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onClickArrowToBottom);
  }

  onClickArrowToBottom() {
    const height = document.getElementById('container').offsetHeight;

    this.setState({
      containerHeight: height,
    });
  }

  render(){
    return (
      <div id="container" className="top-container">
        <Nav />
        <div className="container">
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
            <section>
              <i>
                <Scroll offset={this.state.containerHeight}>
                  <img src={ic_under_arrow} alt='Arrow To Bottom' className='arrow-to-bottom' />
                </Scroll>
              </i>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
