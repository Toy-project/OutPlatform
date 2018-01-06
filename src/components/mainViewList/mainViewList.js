import React from 'react';
import '../../scss/common.scss';
import './scss/mainViewList.scss';
import Card from '../card/card';

class mainViewList extends React.Component {
  render(){
    return (
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s1">
              <Card />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default mainViewList;
