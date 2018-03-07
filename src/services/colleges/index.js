import axios from 'axios';

const urlColleges = `/colleges/`;

export function getColleges(start, end, keyword) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlColleges}?start=${start}&end=${end}&keyword=${keyword}`,
    responseType: 'json'
  });
}
