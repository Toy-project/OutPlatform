import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Category, InnerError, InnerLoading } from 'components/';

import * as Common from 'helper/common';

class CategoryList extends React.Component {

  render() {
    let category = () => {
      if(Common.isLoading(this.props.category)) {
        return <InnerLoading a={this.props.category.isLoading} />;
      }

      if(Common.isError(this.props.category)){
        return <InnerError component={'카테고리'}/>;
      }

      const category = this.props.category;

      if(Common.checkEmptyData(category)) {
        return false;
      }

      return <Category {...category} />
    }
    return (
      <div className='category-wrapper'>
        <div className='category-inner'>
          {category()}
        </div>
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
