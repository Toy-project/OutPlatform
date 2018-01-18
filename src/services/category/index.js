import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlGetAllCategory = `${apiAddres}/category`;

export function getAllCategory(){
  return axios({
    method: 'get',
    timeout: 20000,
    url: urlGetAllCategory,
    responseType: 'json'
  });
}
