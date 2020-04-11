import utils from '../../helpers/utils';
import cowData from '../../helpers/data/cowData';

// const showForm = () => {
//   let domString = '';

//   domString += 'edit-cow';

//   utils.printToDom('edit-cow', domString);
// };

const showForm = (cowId) => {
  cowData.getSingleCow(cowId)
    .then((resp) => {
      const cow = resp.data;

      let domString = '';

      domString = '<h2 class="text-center pb-2">Edit Cow</h2>';

      domString += `<form class="card col-10 offset-1 bg-light p-2 edit-cow-form-tag" id="${cowId}">`;
      domString += '  <div class="form-group">';
      domString += '    <label for="cow-name">Name</label>';
      domString += `    <input type="text" class="form-control" id="edit-cow-name" placeholder="${cow.name}">`;
      domString += '  </div>';
      domString += '  <div class="form-group">';
      domString += '    <label for="cow-breed">Breed</label>';
      domString += `    <input type="text" class="form-control" id="edit-cow-breed" placeholder="${cow.breed}">`;
      domString += '  </div>';
      domString += '  <div class="form-group">';
      domString += '    <label for="cow-location">Location</label>';
      domString += `    <input type="text" class="form-control" id="edit-cow-location" placeholder="${cow.location}">`;
      domString += '  </div>';
      domString += '  <div class="form-group">';
      domString += '    <label for="cow-weight">Weight (lbs)</label>';
      domString += `    <input type="number" class="form-control" id="edit-cow-weight" placeholder="${cow.weight}">`;
      domString += '  </div>';
      domString += '<button type="submit" class="btn btn-dark" id="cow-modifier">Modify Cow</button>';
      domString += '</form>';

      utils.printToDom('edit-cow', domString);
      utils.printToDom('single-farmer', '');
    })
    .catch((err) => console.error('could not get single cow', err));
};

export default { showForm };
