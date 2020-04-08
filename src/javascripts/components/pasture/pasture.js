import cowData from '../../helpers/data/cowData';
import smashData from '../../helpers/data/smash';
import utils from '../../helpers/utils';
import cowComponent from '../cow/cow';
import newCowComponent from '../newCow/newCow';

const removeCow = (e) => {
  const cowId = e.target.closest('.card').id;
  smashData.completelyRemoveCow(cowId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCows();
      utils.printToDom('single-farmer', '');
    })
    .catch((err) => console.error('could not delete cow', err));
};

const makeACow = (e) => {
  e.preventDefault();

  const newCow = {
    name: $('#cow-name').val(),
    breed: $('#cow-breed').val(),
    location: $('#cow-location').val(),
    weight: $('#cow-weight').val() * 1,
    // uid: firebase.auth().currentUser.uid,
  };

  cowData.addCow(newCow)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCows();
      utils.printToDom('new-cow', '');
    })
    .catch((err) => console.error('could not add cow', err));
};

// make smash getCowsWithOwners
// move cowData.getCows into smash
// in smash call farmerCowData.getFarmerCows, getAllFarmers
// smash return array of cow objects - each should have an array of farmers
// each farmer sould have aboolean idChecked (true if farmer owns cow)
// mod domString, show checkboxes
// when checkbox is checked POST to farmerCows
// when checkbox is unchecked DELETE from farmerCows


const buildCows = () => {
  smashData.getCowsWithOwners()
    .then((cows) => {
      let domString = '';
      domString += '<h2 class="text-center">Pasture</h2>';
      domString += '<button id="show-add-cow-form" class="btn btn-success mb-2"><i class="fas fa-plus"></i></button>';
      domString += '<div class="d-flex flex-wrap">';
      cows.forEach((cow) => {
        domString += cowComponent.cowMaker(cow);
      });
      domString += '</div>';
      utils.printToDom('pasture', domString);
      $('body').on('click', '.delete-cow', removeCow);
      $('body').on('click', '#cow-creator', makeACow);

      $('#show-add-cow-form').click(newCowComponent.showForm());
    })
    .catch((err) => console.error('get cows broke', err));
};

export default { buildCows };
