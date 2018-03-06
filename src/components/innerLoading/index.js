import React from 'react';
import { SyncLoader } from 'react-spinners';

import './scss/index.scss';

class InnerLoading extends React.Component {

  render() {
    return (
      <div className='inner-loading-container'>
        <SyncLoader
          color={'#68ccb0'}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

InnerLoading.propTypes = {

};

export default InnerLoading;
