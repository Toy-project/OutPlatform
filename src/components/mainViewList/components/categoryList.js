import React from 'react';

import Category from '../../category/';

import { connect } from 'react-redux';

const CategoryList = ({ category }) => (
  <div>
    <Category {...category} />
  </div>
)

CategoryList.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    category: state.category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
