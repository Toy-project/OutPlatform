import React from 'react';
import Scroll from 'react-scroll-to-element';

import './scss/index.scss';
import { Nav } from 'components/';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      containerHeight: 0,
    }
    this.onArrowToBottom = this.onArrowToBottom.bind(this);
  }

  componentDidMount() {
    this.onArrowToBottom();

    window.addEventListener('resize', this.onArrowToBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onArrowToBottom);
  }

  onArrowToBottom() {
    const height = document.getElementById('container').offsetHeight;

    this.setState({
      containerHeight: height,
    });
  }

  render(){
    return (
      <div id="container" Style={`height:${window.innerHeight}px`} className="top-container">
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
                  <i></i>
                </label>
                <input type="text" id="search" placeholder='ex) 동아리명, 카테고리' />

              </div>
            </form>
            <span className='quoting-count'>
              외주 견적 문의 <br />
              130  회
            </span>
            <section>
              <Scroll offset={this.state.containerHeight}>
                <i class='arrow-to-bottom'></i>
              </Scroll>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
