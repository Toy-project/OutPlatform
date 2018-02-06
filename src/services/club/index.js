import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlClub = `${apiAddres}/club/`;

export function getClubById(club_id){
  // return axios({
  //   method: 'get',
  //   timeout: 20000,
  //   url: `${urlClub}/${id}`,
  //   responseType: 'json'
  // });
  return new Promise( (resolve, reject) => {
    const data = {
      data: {
        'club_id': club_id,
        'club_name': 'test',
        'club_profile_photo': '',
        'club_copyright': 'test',
        'club_phone': 'test',
        'club_photo': [],
        'club_ex': 'test',
        'club_college': 'test',
        'cate_id': 1,
        'tag_id': 1,
        'club_history': 'test',
      }
    };
    resolve(data);
  });
}
