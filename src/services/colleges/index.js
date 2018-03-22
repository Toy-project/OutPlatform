import axios from 'axios';

const urlColleges = `${process.env.API_URL}/colleges/`;

export function getColleges(start, end, keyword) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlColleges}?start=${start}&end=${end}&keyword=${keyword}`
  });
}
