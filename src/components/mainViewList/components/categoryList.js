import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { addCategory } from '../../../actions/category/'
import Category from '../../category/';
import { apiAddres } from '../../../helper/variables';

const urlGetAllCategory = `${apiAddres}/category`;

class CategoryList extends React.Component {
  componentDidMount() {
    axios({
      method: 'get',
      url: urlGetAllCategory,
    })
      .then((response) => {
        response.data.map((data, key) => {
          return this.props.addCategory(data);
        })
      })
      .catch((err) => {
        console.log(err);
      });
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
