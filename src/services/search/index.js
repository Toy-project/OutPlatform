import axios from 'axios';
import { searchListEnd } from 'helper/variables';
const urlClub = `${process.env.API_URL}/club`;

export function getClubByKeyword(keyword, start) {
  return axios({
    method: 'get',
    url: `${urlClub}/search/${keyword}?start=${start}&end=${searchListEnd}`,
  })
}
