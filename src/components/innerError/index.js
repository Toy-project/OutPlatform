import React from 'react';

import './scss/index.scss';

class InnerError extends React.Component {
  render() {
    return (
      <div className='inner-error-container'>
        <h2>네트워크의 문제로 {this.props.component}을/를 불러오지 못했습니다.</h2>
      </div>
    );
  }
}

InnerError.propTypes = {
};

export default InnerError;
