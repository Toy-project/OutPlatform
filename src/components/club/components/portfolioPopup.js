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
    console.log('popup');
    return (
      <div id='popup_container' className='popup_container'>
        <div className='portfolio-popup-wrapper'>
          <p>ss</p>
        <p>ss</p>
      <p>ss</p>
    <p>ss</p>
  <p>ss</p>
        </div>
      </div>
    );
  }
}

PortfolioPopup.propTypes = {
};

export default PortfolioPopup;
