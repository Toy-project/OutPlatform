import React from 'react';
import { withRouter } from "react-router-dom";

import * as LoginHelper from 'helper/loginHelper';

import * as Cart from 'services/cart';

class Contents extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddCart = this.handleAddCart.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleView() {
    const club_id = this.props.club_id;

    this.props.history.push(`/club/${club_id}`);
  }

  handleAddCart() {
    //로그인 확인
    if(!LoginHelper.getCurrentTokenData()) {
      return false;
    }

    //일반회원인지 확인
    if (!LoginHelper.isMember(LoginHelper.getCurrentTokenData())) {
      return false;
    }

    const data = {
      'mem_id' : LoginHelper.getCurrentTokenData().mem_id,
      'club_id' : this.props.club_id
    }

    //로딩
    this.props.loadingForCart();

    // 카트에 담기
    Cart.createCart(data)
      .then((res) => {
        this.props.loadingForCart();
        this.props.messagePopupForCart();
      })
      .catch((err) => {
        this.props.loadingForCart();
      });
  }

  render() {
    const cart_add_btn = (
      <span className="card-button">
          {LoginHelper.isMember(LoginHelper.getCurrentTokenData() ? LoginHelper.getCurrentTokenData() : []) ? <button className="btn" onClick={this.handleAddCart}>담기</button> : <button className="btn" onClick={this.handleView}>자세히</button>}
      </span>
    );

    return (
      <div>
        <span className="card-title">
          {this.props.club_name}
        </span>
        <p className="card-contents">
          {this.props.club_copyright}
        </p>
        <span className="card-rating">
          <span className="card-star">
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
          </span>
          {/* 장바구니 버튼 표시 */}
          {this.props.isCartButtonView ? cart_add_btn : ''}
        </span>
      </div>
    );
  }
}

Contents.propTypes = {

};
export default withRouter((Contents));
