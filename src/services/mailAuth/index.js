import axios from 'axios';

const urlMailAuth = `${process.env.API_URL}/mail`;

export function sendEmail(receiver){
  console.log(receiver);
  return axios({
    method: 'post',
    timeout: 20000,
    url: `${urlMailAuth}/verify`,
    data : {
      receiver : receiver,
    },
  });
}
