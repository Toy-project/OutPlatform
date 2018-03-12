import axios from 'axios';
const urlClub = `${process.env.API_URL}/club`;

export function getClubById(club_id){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}/${club_id}`,
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

export function updateClubPhoto(club_id, file, num) {
  return axios({
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'json',
    url: `${urlClub}/photo/${club_id}?num=${num}`,
    data: file,
  })
}

export function updateClub(club_id, data) {
  return axios({
    method: 'put',
    url: `${urlClub}/${club_id}`,
    data: data,
  })
}

export function getClubCategory(cate_id, start, end){
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${urlClub}/category/${cate_id}?start=${start}&end=${end}`,
    responseType: 'json'
  });
}

export function deleteClub(club_id) {
  return axios({
    method: 'delete',
    url: `${urlClub}/${club_id}`,
  })
}
