import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlMember = `${apiAddres}/member/`;

export function getMemberByUserId(mem_id) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlMember}/${mem_id}`,
    responseType: 'json'
  })
}

export function getMemberEmail(mem_email) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlMember}/email/${mem_email}`,
    responseType: 'json'
  })
}

export function getMemberUserId(mem_userid) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlMember}/userid/${mem_userid}`,
    responseType: 'json'
  })
}

export function createMember(data) {
  return axios({
    method: 'post',
    url: `${urlMember}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  })
}

export function updateMember(mem_id, data) {
  return axios({
    method: 'put',
    url: `${urlMember}/${mem_id}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  })
}
