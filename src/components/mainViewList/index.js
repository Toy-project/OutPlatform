import React from 'react';

import './scss/index.scss';

import CategoryList from './components/categoryList';
import CardList from './components/cardsList';

const mainViewList = () => (
  <div className="container">
    <div className="row">
      <div className="col s12">
        <div className="viewList">
          <CategoryList />
          <CardList />
        </div>
      </div>
    </div>
  </div>
)

export default mainViewList;
