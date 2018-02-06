import axios from 'axios';
import { apiAddres } from 'helper/variables';

const urlPortfolio = `${apiAddres}/career/`;

export function getPortfolioById(club_id){
  return new Promise( (resolve, reject) => {
    const data = {
      data: []
    };
    resolve(data);
  });
}
