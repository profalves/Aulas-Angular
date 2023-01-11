const pedido = { amount: 1000, canceled: false };

const copiaPedido = (pedido) => {
  // Para diblar a mudança indesejada:
  // const novoPedido = Object.assign({}, pedido);
  // novoPedido.canceled = true;
  pedido.canceled = true;
  return pedido; // return novoPedido
};

const novoPedido = copiaPedido(pedido);
novoPedido.amount = 200

console.log(pedido); // { amount: 200, canceled: true }
console.log(novoPedido); // { amount: 200, canceled: true }
