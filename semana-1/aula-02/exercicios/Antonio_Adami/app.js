state = {
    items: [],
    total: 0
}

$("#form").submit(function (event) {
    event.preventDefault();

    let $inputs = $('#form :input');
    let input = {};
    $inputs.each(function() {
        if(this.tagName === 'INPUT') {
            input[this.name] = $(this).val();
        }
    });

    input.subTotal = parseFloat(input.value) * parseInt(input.amount);

    state.items.push(input);
    state.total += input.subTotal

    console.log(input);

    $('#table-body').append(
        `
        <tr>
            <td class="name">${input.name}</td>
            <td class="amount">${input.amount}</td>
            <td class="value">R$${input.value}</td>
            <td class="subTotal">R$${input.subTotal}</td>
        </tr>
        `
      );
});