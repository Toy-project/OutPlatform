import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlGetAllCategory = `${apiAddres}/category`;

export function getAllCategory(){
  // return axios({
  //   method: 'get',
  //   timeout: 20000,
  //   url: urlGetAllCategory,
  //   responseType: 'json'
  // });

  return new Promise((resolve, reject) => {
    const data = {
      data: {
        rows: [
          {
            'cate_id': 1,
            'cate_name': '디자인',
          },
          {
            'cate_id': 2,
            'cate_name': 'IT/프로그래밍',
          },
          {
            'cate_id': 3,
            'cate_name': '컨텐츠 제작',
          },
          {
            'cate_id': 4,
            'cate_name': '마케팅',
          }
        ]
      }
    };

    resolve(data);
  });
}
