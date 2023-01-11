$ = (query) => {
  const element = document.querySelector(query);
  
  if (element && element.lenght > 1) 
    return element[0]
  return element || null;
}
  
state = {
  name: "Changed by JS state"
}

function renderDOM() {
  $('#app').innerHTML = '';
  $('#app').innerHTML = `
  <button id="btn">${state.name}</button>
  `
}

function setState(callback) {
  callback();
  renderDOM();
}

setTimeout(() => changeState(()=> {
  state.name = "changed by change state function"
}), 3000);

renderDOM()