import axios from 'axios';
import { searchListEnd } from 'helper/variables';
const urlClub = `/club`;

export function getClubByKeyword(keyword, start) {
  return axios({
    method: 'get',
    url: `${urlClub}/search/${keyword}?start=${start}&end=${searchListEnd}`,
  })
}
