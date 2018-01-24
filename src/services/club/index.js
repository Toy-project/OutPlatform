import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlClub = `${apiAddres}/club/`;

export function getClubById(id){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}/${id}`,
    responseType: 'json'
  });
}
