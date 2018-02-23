import axios from 'axios';

const urlTag = `/tag`;

export function getAllTag(start, end){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlTag}?start=${start}&end=${end}`,
    responseType: 'json'
  });
}
