import axios from 'axios';

const urlColleges = `${process.env.API_URL}/colleges/`;

export function getColleges(start, end, keyword) {
  const url = `http://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=15a88b1d40746ac8defb105695e54c98&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&thisPage=${start}&perPage=${end}&searchSchulNm=${keyword}`;
  return axios({
    method: 'get',
    timeout: 20000,
    url: `${url}`,
  });
  // url: `${urlColleges}?start=${start}&end=${end}&keyword=${keyword}`,
}
