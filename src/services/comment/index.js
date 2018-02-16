import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlComment = `${apiAddres}/comment/`;

export const getCommentById = (club_id, start, end) => {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlComment}/club/${club_id}?start=${start}&end=${end}`,
    responseType: 'json'
  })
}

export const createComment = (data) => {
  return axios({
    method: 'post',
    url: `${urlComment}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  })
}
