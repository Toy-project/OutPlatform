import React from 'react';

import '../scss/index.scss';

const List = ( {cate_name} ) => (
  <div>
    <ul>
      {cate_name.map((item, key) => {
        return (
          <li key={key}><button className="btn">{item}</button></li>
        );
      })}
    </ul>
  </div>
)

List.propTypes = {
};

export default List;
