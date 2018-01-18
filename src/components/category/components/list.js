import React from 'react';

import '../scss/index.scss';

const List = ( {data} ) => (
  <div>
    <ul>
      {data.map((item, key) => {
        return (
          <li key={key}><button className="btn">{item.cate_name}</button></li>
        );
      })}
    </ul>
  </div>
)

List.propTypes = {
};

export default List;
