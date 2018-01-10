import React from 'react';

import './scss/category.scss';

import Title from './components/title';
import List from './components/list';

const Category = () => (
  <div className="category">
    <div className="category_title">
      <Title />
    </div>
    <div className="category_list">
      <List />
    </div>
  </div>
)

export default Category;
