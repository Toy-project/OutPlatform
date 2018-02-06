import React from 'react';

class PortfolioPopup extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      career_id: this.props.data.career_id,
      career_name: this.props.data.career_name,
      career_ex: this.props.data.career_ex,
      career_photo: this.props.data.career_photo,
      career_due_start: this.props.data.career_due_start,
      career_due_end: this.props.data.career_due_end,
      //career_peple: this.props.data.career_peple,
      //career_co: this.props.data.career_co,
    }

    this.closePopup = this.closePopup.bind(this);
    this.clickOutsideListner = this.clickOutsideListner.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addVideoLink = this.addVideoLink.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('click', this.clickOutsideListner);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutsideListner);
  }

  //팝업을 종료하는 함수
  closePopup(data) {
    this.props.close();
  }

  clickOutsideListner(e) {
    if (e.target.id === 'popup_container'){
      console.log(this.state.data);
      this.closePopup();
    }
  }

  //Create
  handleAdd() {
    //POST API
  }

  //Update
  handleUpdate() {
    //Update
  }

  //Add video Link
  addVideoLink() {

  }

  onDrop(e) {
    const img = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      this.setState({
        ...this.state,
        career_photo: reader.result,
      });
    }, false);

    if(img) {
      reader.readAsDataURL(img);
    }
  }

  render() {
    //2000년을 기준
    const yearCriteria = 2000;
    const setToday = new Date();
    const setMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const setDay = [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
      '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
      '25', '26', '27', '28', '29', '30', '31'
    ];
    let setYear = [];

    const from = this.state.career_due_start.split('-');
    const to = this.state.career_due_end.split('-');

    for(let i = yearCriteria; i <= setToday.getFullYear(); i++) {
      setYear.push(i);
    }

    return (
      <div id='popup_container' className='popup_container'>
        <div className='portfolio-popup-wrapper'>
          <header className='portfolio-popup-header'>
            {/* <div className='preview'>
              <img src={this.state.career_photo} alt="" className='default-image' />
            </div> */}
            <div className='close-btn' onClick={this.closePopup}></div>
            <button className='ok-btn' onClick={this.handleAdd}>확인</button>
            <div className='icons'>
              <div className='add-image-icon'>
                <label htmlFor="onDrop" className='image-icon'></label>
                <input type='file' id='onDrop' onChange={this.onDrop} accept="image/*"/>
                <h5>사진 업로드</h5>
              </div>
              <div className='add-video-icon'>
                <span className='video-icon' onClick={this.addVideoLink}></span>
                <h5>영상 url</h5>
              </div>
            </div>
          </header>
          <footer className='portfolio-popup-footer'>
            <form>
              <div className='portfolio-popup-input'>
                <label htmlFor='portfolio-name'>프로젝트 명</label>
              <input type='text' id='portfolio-name' placeholder='20자 이내' defaultValue={this.state.career_name} />
              </div>
              <div className='portfolio-popup-input'>
                <label htmlFor='portfolio-name'>프로젝트 기간</label>
                <span className='from'>
                  <select className='year' defaultValue={from[0]}>
                    <option value='0'>년도</option>
                    {setYear.map((val, key) => {
                      return <option key={key} value={val}>{val}</option>
                    })}
                  </select>
                  <select className='month' defaultValue={from[1]}>
                    <option value='0'>월</option>
                    {setMonth.map((val, key) => {
                      return <option key={key} value={val}>{val}</option>
                    })}
                  </select>
                  <select className='day' defaultValue={from[2]}>
                    <option value='0'>일</option>
                    {setDay.map((val, key) => {
                      return <option key={key} value={val}>{val}</option>
                    })}
                  </select>
                  부터
                </span>

                <span className='to'>
                  <select className='year' defaultValue={to[0]}>
                    <option value='0'>년도</option>
                    {setYear.map((val, key) => {
                      return <option key={key} value={val}>{val}</option>
                    })}
                  </select>
                  <select className='month' defaultValue={to[1]}>
                    <option value='0'>월</option>
                    {setMonth.map((val, key) => {
                      return <option key={key} value={val}>{val}</option>
                    })}
                  </select>
                  <select className='day' defaultValue={to[2]}>
                    <option value='0'>일</option>
                    {setDay.map((val, key) => {
                      return <option key={key} value={val}>{val}</option>
                    })}
                  </select>
                  까지
                </span>
              </div>
              <div className='portfolio-popup-input'>
                <label htmlFor='portfolio-name'>프로젝트 설명</label>
                <textarea defaultValue={this.state.career_ex}></textarea>
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
