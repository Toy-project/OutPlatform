import axios from 'axios';

const urlNexmo = `/nexmo`;

export function sendingVerifiedCode(number) {
  const brand = "외주대학교"
  return axios({
    method: 'post',
    url: `${urlNexmo}/verify`,
    headers: {
      'content-type': 'application/json'
    },
    data: {
      number : number,
      brand : brand
    }
  })
}

export function checkVerifiedCode(data) {
  return axios({
    method: 'post',
    url: `${urlNexmo}/verify/check`,
    headers: {
      'content-type': 'application/json'
    },
    data: data
  })
}

export function cancelVerifiedCode(request_id) {
  return axios({
    method: 'get',
    url: `${urlNexmo}/verify/cancel/${request_id}`,
    headers: {
      'content-type': 'application/json'
    }
  })
}
