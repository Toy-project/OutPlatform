import React from 'react';
import { connect } from 'react-redux';

import { fetchSortCardsByCateId } from 'actions/card';

class List extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.fetchSortCardsByCateId(e.target.id);
  }

  render() {
    return (
      <div onClick={this.click}>
        <ul>
          {this.props.data.map((item, key) => {
            return (
              <li key={key}><button id={item.cate_id} onClick={this.handleClick} className="btn" >{item.cate_name}</button></li>
            );
          })}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSortCardsByCateId: (cate_id) => {
      dispatch(fetchSortCardsByCateId(cate_id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
