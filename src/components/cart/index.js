import React from 'react';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import './scss/index.scss';

import * as Common from 'helper/common';
import * as Security from 'helper/securityHelper';
import * as LoginHelper from 'helper/loginHelper';

import * as CartService from 'actions/cart';

import { Card, InnerError, InnerLoading } from 'components/';

class Cart extends React.Component {
    constructor(props){
      super(props);

      this.loadingData = this.loadingData.bind(this);
      this.handleDeleteCart = this.handleDeleteCart.bind(this);
    }

    handleDeleteCart = (cart_id) => (e) => {
      this.props.deleteCart(cart_id);
    }

    loadingData () {
      const mem_id = LoginHelper.getCurrentTokenData().mem_id;

      this.props.fetchRepeatCart(mem_id, this.props.cart.start);
    }

    componentDidMount() {
      //로그인 토큰이 없으면
      if(!LoginHelper.getCurrentToken()) {
        return false;
      }

      //일반 회원이 아니면
      if(!LoginHelper.isMember(LoginHelper.getCurrentTokenData())) {
        return false;
      }

      const mem_id = LoginHelper.getCurrentTokenData().mem_id;
      console.log('ss');
      this.props.fetchCart(mem_id, 0);
    }

    render() {
      //Redirect if worng myPage access has been detected,
      if(!Security.defenceAccessingWithoutToken(this.props.login.loggined) ||
         Security.defenceAccessingWithInvalidToken()) {
        this.props.history.push(`/`);
      }

      let club_count = this.props.cart.count;

      const cart = () => {
        if(Common.isLoading(this.props.cart)) {
          return (
            <div className='global-loading'>
              <InnerLoading loading={this.props.cart.isLoading} />
            </div>
          );
        }

        if(Common.isError(this.props.cart)){
          return (
            <div className='global-error'>
              <InnerError component={'장바구니'} />
            </div>
          );
        }

        const cart = this.props.cart.data;

        if(Common.checkEmptyData(cart)){
          return false;
        }
        // console.log(cart);
        return cart.map( (cart, key) => {
          return (
              <li key={key}>
                <Card
                  data = {cart}
                  isCartButtonView = {false}
                />
                <button onClick={this.handleDeleteCart(cart.cart_id)} className='delete-btn'>삭제</button>
              </li>
          );
        });
      }

      const endMessage = () => {
        if(!this.props.cart.isLoading && !this.props.cart.error) {
          return (
            <div className='end-message'>
              장바구니에 저장된 단체를 다 보셨습니다! <br />
              마음에 드시는 단체는 찾으셨나요?:)
            </div>
          );
        }
      }

      return (
        <div className='cart-container'>
          <div className='container'>
            <div className="row">
              <div className="col s12">
                <div className='viewList'>
                  <h1>장바구니</h1>
                  <div className='card-total-number'>
                    등록된 단체 수 : {club_count}
                  </div>
                  <ul>
                    <InfiniteScroll
                      next={this.loadingData}
                      hasMore={this.props.cart.hasMore}
                      endMessage={endMessage()}>
                      {cart()}
                    </InfiniteScroll>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

Cart.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (mem_id, start) => {
      dispatch(CartService.fetchCart(mem_id, start));
    },

    fetchRepeatCart: (mem_id, start) => {
      dispatch(CartService.fetchRepeatCart(mem_id, start));
    },

    deleteCart: (cart_id) => {
      dispatch(CartService.fetchDeleteCart(cart_id));
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));
