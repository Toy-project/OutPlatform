import React from 'react';
import '../../scss/common.scss';
import './scss/mainViewList.scss';
import Card from '../card/card';
import Category from '../category/category';

class mainViewList extends React.Component {
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="viewList">
              <Category />
              <ul class="center">
                <li><Card /></li>
                <li><Card /></li>
                <li><Card /></li>
                <li><Card /></li>
                <li><Card /></li>
                <li><Card /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default mainViewList;
