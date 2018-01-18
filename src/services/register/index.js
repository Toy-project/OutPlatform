import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlPostMember = `${apiAddres}/member`;

export function postMember(data) {
  return axios({
    method: 'post',
    url: urlPostMember,
    data: data,
  })
  .then((response) => {
    return true;
  })
  .then((error) => {
    return false;
  });
}
