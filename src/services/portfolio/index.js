import axios from 'axios';

const urlPortfolio = `/career`;

export function getAllClubByCareerId(club_id){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlPortfolio}/club/${club_id}?start=0&end=6`,
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

export function deleteCareer(career_id) {
  return axios({
    method: 'delete',
    url: `${urlPortfolio}/${career_id}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
