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

export function getClubAll(start, count){
  // return axios({
  //   method: 'get',
  //   timeout: 20000,
  //   url: `${urlGetAllClubLists}/${start}/${count}`,
  //   responseType: 'json'
  // });

  return new Promise( (resolve, reject) => {
    let data;
    if(start === 0) {
      data = {
        data: {
          count: 9,
          rows: [
            {
              'club_id': 1,
              'club_photo': 'test',
              'club_name': '첫번째 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            }
            ,
            {
              'club_id': 2,
              'club_photo': 'test',
              'club_name': '세번째 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            },
            {
              'club_id': 3,
              'club_photo': 'test',
              'club_name': '두번째 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            },
            {
              'club_id': 4,
              'club_photo': 'test',
              'club_name': '네번째 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            }
            ,
            {
              'club_id': 5,
              'club_photo': 'test',
              'club_name': '다번째 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            },
            {
              'club_id': 6,
              'club_photo': 'test',
              'club_name': '여번째 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            }
          ]
        }
      };
    } else if(start === 6){
      data = {
        data: {
          count: 9,
          rows: [
            {
              'club_id': 1,
              'club_photo': 'test',
              'club_name': '일곱 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            }
            ,
            {
              'club_id': 2,
              'club_photo': 'test',
              'club_name': '여덞 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            },
            {
              'club_id': 3,
              'club_photo': 'test',
              'club_name': '아홉 동아리',
              'club_rating': 1,
              'club_ex': '저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.'
            }
          ]
        }
      };
    }

    resolve(data);
  });
}
