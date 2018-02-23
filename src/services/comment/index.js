import axios from 'axios';

const urlComment = `/comment`;

export const getCommentById = (club_id, start, end) => {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlComment}/club/${club_id}?start=${start}&end=${end}`,
    responseType: 'json'
  });
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
  });
}

export const updateComment = (data) => {
  return axios({
    method: 'put',
    url: `${urlComment}/${data.comment_id}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export const deleteComment = (data) => {
  return axios({
    method: 'delete',
    url: `${urlComment}/${data.comment_id}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
