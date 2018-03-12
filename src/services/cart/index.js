import axios from 'axios';
import * as variables from 'helper/variables';
const urlCart = `/cart`;

export function getCart(mem_id, start) {
  return axios({
    method: 'get',
    url: `${urlCart}/${mem_id}?start=${start}&end=${variables.cartListEnd}`,
  });
}

export function deleteCart(cart_id) {
  return axios({
    method: 'delete',
    url: `${urlCart}/${cart_id}`,
  });
}

export function createCart(data) {
  return axios({
    method: 'post',
    url: `${urlCart}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}
