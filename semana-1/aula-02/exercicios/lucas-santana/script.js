this.count = 0;

function addOrRemove(count) {
  this.count = this.count + count;
  let soma = this.count;
  if (soma < 0) {
    this.count = 0;
    soma = this.count;
  }
  document.getElementById("soma").innerHTML = soma;
  let total = soma * 50;
  document.getElementById("total").innerHTML = total;
}
