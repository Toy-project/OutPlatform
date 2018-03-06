import axios from 'axios';

const urlComment = `/comment`;

export function getCommentById(club_id, start, end) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlComment}/club/${club_id}?start=${start}&end=${end}`,
    responseType: 'json'
  });
}

export function createComment(data) {
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

export function updateComment(data) {
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

export function deleteComment(comment_id) {
  return axios({
    method: 'delete',
    url: `${urlComment}/${comment_id}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
