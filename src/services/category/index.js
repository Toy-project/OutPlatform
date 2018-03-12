import axios from 'axios';

const urlGetAllCategory = `${process.env.API_URL}/category`;

export function getAllCategory(start, end){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlGetAllCategory}?start=${start}&end=${end}`,
    responseType: 'json'
  });
}
