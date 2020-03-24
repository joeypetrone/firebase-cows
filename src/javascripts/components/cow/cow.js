const cowMaker = (cow) => {
  let domString = '';
  domString += '<div class="card">';
  domString += `<div class="card-header">${cow.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<h6 class="card-title">${cow.breed}</h6>`;
  domString += `<p class="card-text">Weight: ${cow.weight}</p>`;
  domString += `<p class="card-text">Location: ${cow.location}</p>`;
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { cowMaker };
