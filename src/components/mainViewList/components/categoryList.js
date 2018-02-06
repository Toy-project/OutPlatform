import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Category } from 'components/';

import { checkStatusComponent, checkEmptyData } from 'helper/clubHelper';

class CategoryList extends React.Component {

  componentDidMount() {
  }

  render() {
    let category = () => {
      if(!checkStatusComponent(this.props.category)) {

      } else {
        const category = this.props.category;

        if(checkEmptyData(category)) {
          return false;
        }

        return <Category {...category} />
      }
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
