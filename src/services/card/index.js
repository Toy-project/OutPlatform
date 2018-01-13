import axios from 'axios';
import { apiAddres } from '../../helper/variables';

const urlGetAllClubLists = `${apiAddres}/club/search`;

export function getClubLists(start, count){
  return axios({
    method: 'get',
    url: `${urlGetAllClubLists}/${start}/${count}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
