import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlClub = `${apiAddres}/club`;

export function getClubById(club_id, cate_id, tag_id){
  console.log('hi');
  console.log(cate_id, tag_id);
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}/${club_id}?cate_id=${cate_id}&tag_id=${tag_id}`,
    responseType: 'json'
  });
}

export function getClubAll(start, end){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}?start=${start}&end=${end}`,
    responseType: 'json'
  });
}

export function getClubUserId(club_userid){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}/userid/${club_userid}`,
    responseType: 'json'
  })
}

export function getClubName(club_name) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}/name/${club_name}`,
    responseType: 'json'
  })
}

export function getClubEmail(club_email) {
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}/email/${club_email}`,
    responseType: 'json'
  })
}

export function createClub(data) {
  return axios({
    method: 'post',
    url: `${urlClub}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  })
}
