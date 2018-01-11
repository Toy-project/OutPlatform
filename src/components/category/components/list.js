import React from 'react';

import '../scss/index.scss';

const List = ( {name} ) => (
  <div>
    <ul>
      {name.map((item, key) => {
        return (
          <li key={key}><a className="btn">{item}</a></li>
        );
      })}
    </ul>
  </div>
)

List.propTypes = {
};

export default List;
