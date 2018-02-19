import axios from 'axios';
import * as PhoneAuthVar from 'helper/variables';

const urlMember = `${PhoneAuthVar.phoneVerifyAPIAddres}`;
const format = 'json';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export function sendingVerifiedCode(to) {
  return axios({
    method: 'post',
    url: `${urlMember}/${format}`,
    headers: {
      'content-type': 'application/json'
    },
    params: {
      api_key : PhoneAuthVar.apiKey,
      api_secret: PhoneAuthVar.apiSecret,
      number: to,
      brand: PhoneAuthVar.brand
    }
  })
}
