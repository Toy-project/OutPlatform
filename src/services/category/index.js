import axios from 'axios';
import { apiAddres } from '../../helper/variables';

const urlGetAllCategory = `${apiAddres}/category`;

export function getAllCategory(){
  return axios({
    method: 'get',
    url: urlGetAllCategory,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
