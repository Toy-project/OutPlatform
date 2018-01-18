import React from 'react';

import './scss/index.scss';

import Title from './components/title';
import List from './components/list';

const Category = ( { data, title }) => (
  <div className="category">
    <div className="category_title">
      <Title title={title} />
    </div>
    <div className="category_list">
      <List data={data} />
    </div>
  </div>
)

export default Category;
