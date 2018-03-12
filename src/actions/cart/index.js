import * as types from './actionTypes';

import * as Cart from 'services/cart';

function requestData() {
	return {type: types.CART_REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.CART_RECV_DATA,
		data: json,
	}
};

function repeatData(json) {
	return{
		type: types.CART_REPEAT_RECV_DATA,
		data: json,
	}
};

function deleteData(cart_id) {
	return{
		type: types.CART_REMOVE_DATA,
		cart_id: cart_id,
	}
};

function receiveError(json) {
	return {
		type: types.CART_RECV_ERROR,
		data: json,
	}
};

export function fetchCart(mem_id, start) {
  return function(dispatch) {
    dispatch(requestData());

    Cart.getCart(mem_id, start)
      .then((res) => {
        dispatch(receiveData(res.data));
      })
      .catch((err) => {
        dispatch(receiveError(err.data));
      });
  }
}

export function fetchRepeatCart(mem_id, start) {
  return function(dispatch) {
    dispatch(requestData());

    Cart.getCart(mem_id, start)
      .then((res) => {
        dispatch(repeatData(res.data));
      })
      .catch((err) => {
        dispatch(receiveError(err.data));
      });
  }
}

export function fetchDeleteCart(cart_id) {
	return function(dispatch) {
    dispatch(requestData());

    Cart.deleteCart(cart_id)
      .then((res) => {
        dispatch(deleteData(cart_id));
      })
      .catch((err) => {
        dispatch(receiveError(err));
      });
  }
}
