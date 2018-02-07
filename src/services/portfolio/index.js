import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlPortfolio = `${apiAddres}/career`;

export function getAllClubByCareerId(club_id, start, end){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlPortfolio}/club/${club_id}?start=${start}&end=${end}`,
    responseType: 'json'
  });
}

export function createCareer(data){
  return axios({
    method: 'post',
    url: `${urlPortfolio}/`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  })
}

export function updateCareer(data) {
  return axios({
    method: 'put',
    url: `${urlPortfolio}/${data.career_id}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  })
}
