import utils from '../../helpers/utils';

const showForm = () => {
  let domString = '';

  domString = '<h2 class="text-center">New Cow</h2>';

  domString += '<form class="ml-4">';
  domString += '<div class="form-row">';
  domString += '  <div class="form-group">';
  domString += '    <label for="cow-name">Name </label>';
  domString += '    <input type="text" class="form-control" id="cow-name" placeholder="Name">';
  domString += '  </div>';
  domString += '  <div class="form-group">';
  domString += '    <label for="cow-breed">Breed </label>';
  domString += '    <input type="text" class="form-control" id="cow-breed" placeholder="Angus">';
  domString += '  </div>';
  domString += '  <div class="form-group">';
  domString += '    <label for="cow-location">Location </label>';
  domString += '    <input type="text" class="form-control" id="cow-location" placeholder="Farm">';
  domString += '  </div>';
  domString += '  <div class="form-group">';
  domString += '    <label for="cow-weight">Weight (lbs)</label>';
  domString += '    <input type="number" class="form-control" id="cow-weight" placeholder="55">';
  domString += '  </div>';
  domString += '</div>';
  domString += '<button type="submit" class="btn btn-dark" id="cow-creator">Add Cow</button>';
  domString += '</form>';

  utils.printToDom('new-cow', domString);
};

export default { showForm };