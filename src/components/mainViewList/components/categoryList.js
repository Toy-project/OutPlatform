import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllCategory } from '../../../services/category/';
import { addCategory } from '../../../actions/category/';
import { Category } from '../../';



class CategoryList extends React.Component {

  initData() {
    const res = getAllCategory();

    //Add Data
    res.then((data) => {
      data.map((item, key) => {
        return this.props.addCategory(item);
      });
    });
  }

  componentDidMount() {
    this.initData();
  }

  render() {
    return (
      <div>
        <Category {...this.props.category} />
      </div>
    );
  }
}

CategoryList.propTypes = {
  category: PropTypes.shape({
    cate_name: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  })
};

const mapStateToProps = (state) => {
  return {
    category: state.category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (data) => {
      dispatch(addCategory(data.cate_name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
