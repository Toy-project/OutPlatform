import React from 'react';
import PropTypes from 'prop-types';

const RatingStar = ( { to }) => {
  const starCount = [1, 2, 3, 4, 5];
  return (
    <span>
      {starCount.map((key) => {
        const _fill = key <= to ? '_fill' : '';
        return <i key={key} className={`fa fa-star ${_fill}`}></i>;
      })}
    </span>
  );
}

RatingStar.propTypes = {
  to: PropTypes.number,
};

export default RatingStar;
