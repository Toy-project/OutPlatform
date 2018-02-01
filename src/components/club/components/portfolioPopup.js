import React from 'react';

class PortfolioPopup extends React.Component{
  constructor(props) {
    super(props);

    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('click', this.closePopup);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closePopup);
  }

  //팝업을 종료하는 함수
  closePopup = (e) => {
    if (e.target.id === 'popup_container'){
      this.props.close();
    }
  }

  render() {
    return (
      <div id='popup_container' className='popup_container'>
        <div className='portfolio-popup-wrapper'>
          <header className='portfolio-popup-header'>
            <div className='close-btn' onClick={this.props.close}></div>
            <button className='ok-btn'>확인</button>
            <div className='icons'>
              <div className='add-image-icon'>
                <span></span>
                <h5>사진 업로드</h5>
              </div>
              <div className='add-video-icon'>
                <span></span>
                <h5>영상 url</h5>
              </div>
            </div>
          </header>
          <footer className='portfolio-popup-footer'>
            <form>
              <div className='portfolio-popup-input'>
                <label htmlFor='portfolio-name'>프로젝트 명</label>
                <input type='text' id='portfolio-name' placeholder='20자 이내' />
              </div>
              <div className='portfolio-popup-input'>
                <label htmlFor='portfolio-name'>프로젝트 기간</label>
                <span className='from'>
                  <select className='year'>
                    <option>년도</option>
                  </select>
                  <select className='month'>
                    <option>월</option>
                  </select>
                  <select className='day'>
                    <option>일</option>
                  </select>
                  부터
                </span>

                <span className='to'>
                  <select className='year'>
                    <option>년도</option>
                  </select>
                  <select className='month'>
                    <option>월</option>
                  </select>
                  <select className='day'>
                    <option>일</option>
                  </select>
                  까지
                </span>
              </div>
              <div className='portfolio-popup-input'>
                <label htmlFor='portfolio-name'>프로젝트 설명</label>
                <textarea></textarea>
              </div>
            </form>
          </footer>
        </div>
      </div>
    );
  }
}

PortfolioPopup.propTypes = {
};

export default PortfolioPopup;
