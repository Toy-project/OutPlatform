import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlPortfolio = `${apiAddres}/career/`;

export function getPortfolioById(club_id){
  return new Promise( (resolve, reject) => {
    const data = {
      data: [
        {
          'career_id': 1,
          'career_name': '프로젝트 첫번째',
          'career_ex': '첫번째 프로젝트입니다',
          'career_photo': 'test',
          'career_due_start': '2017-08-01',
          'career_due_end': '2017-09-01',
          'career_peple': '15',
          'career_co': 'test',
        },
        {
          'career_id': 2,
          'career_name': '프로젝트 두번째',
          'career_ex': '두번째 프로젝트입니다',
          'career_photo': 'test',
          'career_due_start': '2017-08-01',
          'career_due_end': '2017-09-01',
          'career_peple': '15',
          'career_co': 'test',
        },
        {
          'career_id': 3,
          'career_name': '프로젝트 세번째',
          'career_ex': '세번째 프로젝트입니다',
          'career_photo': 'test',
          'career_due_start': '2017-08-01',
          'career_due_end': '2017-09-01',
          'career_peple': '15',
          'career_co': 'test',
        }
      ]
    };
    resolve(data);
  });
}
