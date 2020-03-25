import farmerData from './farmerData';
import farmerCowData from './farmerCowData';
import cowData from './cowData';

const getSingleFarmerWithCows = (farmerId) => new Promise((resovle, reject) => {
  farmerData.getFarmerById(farmerId)
    .then((response) => {
      const farmer = response.data;
      farmer.id = farmerId;
      farmer.cows = [];
      // 1. get farmerCows by farmer uid
      farmerCowData.getFarmerCowsByFarmerUid(farmer.uid).then((farmerCows) => {
        // 2. get ALL cows
        cowData.getCows().then((allCows) => {
          // 3. SMASH
          farmerCows.forEach((farmerCow) => {
            const cow = allCows.find((x) => x.id === farmerCow.cowId);
            farmer.cows.push(cow);
          });
          resovle(farmer);
        });
      });
    })
    .catch((err) => reject(err));
});

const completelyRemoveCow = (cowId) => new Promise((resolve, reject) => {
  cowData.deleteCow(cowId)
    .then(() => {
      // 1.  GET all farmerCows by cowId
      farmerCowData.getFarmerCowsByCowId(cowId).then((farmerCows) => {
        // 2.  loop over all farmerCows from step 1 and DELETE each one
        farmerCows.forEach((fCow) => {
          farmerCowData.deleteFarmerCow(fCow.id);
        });
      });
      resolve();
    })
    .catch((err) => reject(err));
});

export default { getSingleFarmerWithCows, completelyRemoveCow };
