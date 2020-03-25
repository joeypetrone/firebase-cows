import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getFarmerCowsByFarmerUid = (uid) => new Promise((resolve, reject) => {
  //   axios.get(`${baseUrl}/farmerCows.json?orderBy="farmerUid"&equalTo="${uid}"`)
  //   axios.get(`${baseUrl}/farmerCows.json?orderBy="farmerUid"&equalTo="${uid}"`)
  axios.get(`${baseUrl}/farmerCows.json?orderBy="farmerUid"&equalTo="${uid}"`)
    .then((response) => {
      const demFarmerCows = response.data;
      const farmerCows = [];

      Object.keys(demFarmerCows).forEach((farmerCowId) => {
        demFarmerCows[farmerCowId].id = farmerCowId;
        farmerCows.push(demFarmerCows[farmerCowId]);
      });
      resolve(farmerCows);
    })
    .catch((err) => reject(err));
});

export default { getFarmerCowsByFarmerUid };
