import axios from 'axios';
import { apiAddres } from 'helper/variables';


const urlAuth = `${apiAddres}/auth`;

export function memberLogin(mem_userid, mem_pw){
  const data = {
    mem_userid : mem_userid,
    mem_pw: mem_pw,
  }

  return axios({
    method: 'post',
    timeout: 20000,
    url: `${urlAuth}/member`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}

export function clubLogin(club_userid, club_pw){
  const data = {
    club_userid : club_userid,
    club_pw: club_pw,
  }

  return axios({
    method: 'post',
    timeout: 20000,
    url: `${urlAuth}/club`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
}
