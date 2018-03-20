import React from 'react';
import Scroll from 'react-scroll-to-element';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';
import { Nav } from 'components/';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      containerHeight: 0,
    }
    this.onArrowToBottom = this.onArrowToBottom.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDetectEnter = this.handleDetectEnter.bind(this);
  }

  handleDetectEnter(e) {
    return e.key === 'Enter' ? this.handleSearch() : false;
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

  handleSearch(e) {
    const keyword = encodeURIComponent(this.refs.keyword.value);
    //세션 저장소에 저장
    sessionStorage.setItem('keyword', keyword);

    this.props.history.push(`/search`);
  }

  render(){
    return (
      <div id="container" style={{height: window.innerHeight + 'px'}} className="top-container">
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
                  <i onClick={this.handleSearch}></i>
                </label>
                <input type="text" ref="keyword" id="search" defaultValue={sessionStorage.getItem('keyword') ? decodeURIComponent(sessionStorage.getItem('keyword')) : ''} placeholder='ex) 동아리명, 카테고리' onKeyPress={this.handleDetectEnter} />
              </div>
            </form>
            {/* <span className='quoting-count'>
              외주 견적 문의 <br />
              130  회
            </span> */}
            <section>
              <Scroll offset={this.state.containerHeight}>
                <i className='arrow-to-bottom'></i>
              </Scroll>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
