import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlGetAllClubLists = `${apiAddres}/club/`;

export function getClubLists(start, count){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlGetAllClubLists}/${start}/${count}`,
    responseType: 'json'
  });
}
