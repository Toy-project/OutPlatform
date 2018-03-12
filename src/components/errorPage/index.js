import React from 'react';

import './scss/index.scss';

class ErrorPage extends React.Component {
  // constructor(props){
  //   super(props);
  //
  //   //to do
  // }
  render() {
    let err_title = '';
    let err_msg = '';

    switch(this.props.type) {
      case 'network' :
        err_title = '네트워크 오류입니다!';
        err_msg = '외주대학교가 고객님께 더 나은 서비스를 제공하기 위해 서비스 점검을 진행하고 있습니다. \n 빠르게 완료한 후 더 나은 모습으로 인사드리겠습니다. \n\n 감사합니다.';
        break;
      default: break;
    }

    return (
      <div className='error-container'>
        <div className='error-wrapper'>
          <div className='container'>
            <h1>{err_title}</h1>
            <p>
              <span>
                {err_msg.split('\n').map((line, key) => {
                  return (<span key={key}>{line}<br /></span>)
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
};

export default ErrorPage;
