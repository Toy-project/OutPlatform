import React from 'react';
import { connect } from 'react-redux';

import * as Services from 'actions/card';
import { cardListEnd } from 'helper/variables';

class List extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (cate_id) => (e) => {
    const start = 0;
    let byCateId = false;

    if(cate_id !== 0) {
      byCateId = true;
    }

    this.props.fetchResetData(cate_id, byCateId);
    if(byCateId) {
      this.props.fetchCardsByCateId(cate_id, start, cardListEnd);
    } else {
      this.props.fetchCards(start, cardListEnd);
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li><button onClick={this.handleClick(0)} className="btn" >전체보기</button></li>
          {this.props.data.map((item, key) => {
            return (
              <li key={key}><button onClick={this.handleClick(item.cate_id)} className="btn" >{item.cate_name}</button></li>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResetData: (cate_id, byCateId) => {
      dispatch(Services.fetchResetData(cate_id, byCateId));
    },
    fetchCardsByCateId: (cate_id, start, end) => {
      dispatch(Services.fetchCardsByCateId(cate_id, start, end));
    },
    fetchCards: (start, end) => {
      dispatch(Services.fetchCards(start, end));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
