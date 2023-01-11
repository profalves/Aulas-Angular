$ = (query) => {
  const element = document.querySelector(query);

  if (element && element.lenght > 1) return element[0];
  return element;
}

// model
state = {
  title: "Changed by State",
  name: "Fulano",
  products: [],
}

function changeState(callback) {
  callback();
  renderDOM();
}

// view
function renderDOM() {
  $('#nameTitle').innerHTML = state.name;
}

renderDOM();

// controller
$('#newName').onchange = function(event) {
  console.log(event.target.value);

  changeState(() => {
    state.name = event.target.value;
  })
}
