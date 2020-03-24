const farmerMaker = (farmer) => {
  let domString = '';
  domString += '<div class="col-3">';
  domString += '<div class="card">';
  domString += `<div class="card-header">${farmer.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<h6 class="card-title">${farmer.age}</h6>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { farmerMaker };
