import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlGetAllCategory = `${apiAddres}/category`;

export function getAllCategory(start, end){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlGetAllCategory}?start=${start}&end=${end}`,
    responseType: 'json'
  });
}
