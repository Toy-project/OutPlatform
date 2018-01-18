import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Category } from 'components/';



class CategoryList extends React.Component {

  componentDidMount() {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
