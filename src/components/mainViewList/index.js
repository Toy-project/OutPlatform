import React from 'react';

import './scss/mainViewList.scss';

import Category from '../category/';
import CardList from './components/cardsList';

const mainViewList = () => (
  <div className="container">
    <div className="row">
      <div className="col s12">
        <div className="viewList">
          <Category />
          <CardList />
        </div>
      </div>
    </div>
  </div>
)

export default mainViewList;
