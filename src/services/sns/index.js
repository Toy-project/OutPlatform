import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlTag = `${apiAddres}/sns`;

export function getSnsByClubId(club_id){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlTag}/club/${club_id}`,
    responseType: 'json'
  });
}
