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

const getCowsWithOwners = () => new Promise((resolve, reject) => {
  cowData.getCows()
    .then((cowsResponse) => {
      farmerData.getFarmers().then((farmerResponse) => {
        farmerCowData.getFarmerCows()
          .then((farmerCowsResponse) => {
            const finalCows = [];
            cowsResponse.forEach((oneCow) => {
              const cow = { farmers: [], ...oneCow };
              const farmerCowOwners = farmerCowsResponse.filter((x) => x.cowId === cow.id);
              farmerResponse.forEach((oneFarmer) => {
                const farmer = { ...oneFarmer };
                const isOwner = farmerCowOwners.find((x) => x.farmerUid === farmer.uid);
                farmer.isChacked = isOwner !== undefined;
                cow.farmers.push(farmer);
              });
              finalCows.push(cow);
            });
            resolve(finalCows);
          })
          .catch();
      });
    })
    .catch((err) => reject(err));
});

// [
// {
//   id: "cow1",
// breed: "Jersey",
// location: "NSS",
// name: "Bessie",
// weight: 30,
// farmers: [
//   {age: 1000, name: "zoe", uid: "", id: "farmer1", isChecked: true},
//   {age: 83, name: "luke", uid: "12345", id: "farmer1", isChecked: false},
//   {age: 12, name: "mary", uid: "67890", id: "farmer1", isChecked: false},

// ]
// }
// ]

export default { getSingleFarmerWithCows, completelyRemoveCow, getCowsWithOwners };
