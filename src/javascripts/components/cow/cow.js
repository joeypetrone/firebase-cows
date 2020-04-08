const cowMaker = (cow) => {
  let domString = '';
  domString += '<div class="col-4">';
  domString += `<div class="card" id="${cow.id}">`;
  domString += `<div class="card-header">${cow.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<h6 class="card-title">${cow.breed}</h6>`;
  domString += `<p class="card-text">Weight: ${cow.weight}</p>`;
  domString += `<p class="card-text">Location: ${cow.location}</p>`;
  domString += '<button class="btn btn-danger delete-cow mb-2"><i class="far fa-trash-alt"></i></button>';
  domString += '<p>Owner(s):</p>';
  domString += '<form>';
  cow.farmers.forEach((farmer) => {
    domString += '<div class="form-check">';
    domString += `<input class="form-check-input farmer-cow-checkbox" type="checkbox" data-farmer-uid=${farmer.uid} id=${farmer.farmerCowId} ${farmer.isChecked ? 'checked' : ''}>`;
    domString += `<label class="form-check-label" for="gridCheck">${farmer.name}</label>`;
    domString += '</div>';
  });
  domString += '</form>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { cowMaker };
