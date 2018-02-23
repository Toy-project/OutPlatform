import React from 'react';
import { connect } from 'react-redux';

class UnregisterPopup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='popup_container'>
        <div className='unregister-popup-container'>
          <div className='header'>
            <h3>회원탈퇴</h3>
            <p>
              정말 탈퇴하시겠습니까? <br />
              회원 탈퇴 시 모든 정보와 이 계정으로 만든 단체 또한 삭제됩니다.
            </p>
          </div>
          <div className='contents'>
            <label htmlFor='pw'>비밀번호</label>
            <input type='password' id='pw' refs='pw' />
          </div>
          <div className='footer'>
            <div className='edit-btn right'>
              <button className='gray-btn' onClick={this.unregisterToggle}>닫기</button>
            </div>
            <div className='edit-btn left'>
              <button className='emerald-btn' onClick={this.unregisterToggle}>탈퇴</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UnregisterPopup.propTypes = {
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnregisterPopup);
