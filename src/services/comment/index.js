import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlComment = `${apiAddres}/comment/`;

export const getCommentById = (club_id, start, end) => {
  return new Promise(function(resolve, reject) {
    let data = {
      data : {}
    };

    if(start === 1){
        data = {
          data: {
            count: 9,
            rows: [
              {
                'comment_id': 1,
                'comment_contents': '첫번째 댓글',
                'club_rating': 1,
                'comment_update': '2018-01-12'
              }
              ,
              {
                'comment_id': 2,
                'comment_contents': '두번째 댓글',
                'club_rating': 5,
                'comment_update': '2018-01-12'
              },
              {
                'comment_id': 3,
                'comment_contents': '세번째 댓글',
                'club_rating': 2,
                'comment_update': '2018-01-12'
              }
            ]
          }
        };
    } else if(start === 4){
      data = {
        data: {
          count: 9,
          rows: [
            {
              'comment_id': 4,
              'comment_contents': '네번째 댓글',
              'club_rating': 1,
              'comment_update': '2018-01-12'
            }
            ,
            {
              'comment_id': 5,
              'comment_contents': '다섯번째 댓글',
              'club_rating': 5,
              'comment_update': '2018-01-12'
            },
            {
              'comment_id': 6,
              'comment_contents': '여섯번째 댓글',
              'club_rating': 2,
              'comment_update': '2018-01-12'
            }
          ]
        }
      };
    } else if(start === 7){
      data = {
        data: {
          count: 9,
          rows: [
            {
              'comment_id': 7,
              'comment_contents': '일곱 댓글',
              'club_rating': 1,
              'comment_update': '2018-01-12'
            }
            ,
            {
              'comment_id': 8,
              'comment_contents': '여덞 댓글',
              'club_rating': 5,
              'comment_update': '2018-01-12'
            },
            {
              'comment_id': 9,
              'comment_contents': '아홉 댓글',
              'club_rating': 2,
              'comment_update': '2018-01-12'
            }
          ]
        }
      };
    }

    resolve(data);
  })
}
