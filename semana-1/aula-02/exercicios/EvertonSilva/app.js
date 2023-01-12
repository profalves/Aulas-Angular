var totalValue = 0;
var discount = 0;
var finalValue = 0;

var valuesitens = [1024, 2240, 1408];

function onClickSub(idx) {
    var numItem = parseInt(document.getElementById('numberImg' + idx).innerHTML);
    if (!isNaN(numItem)) {
        if (numItem > 0) {
            numItem--;
            document.getElementById('numberImg' + idx).innerHTML = numItem;

            totalValue -= valuesitens[idx - 1];

            if (discount > 0) {
                onApplyDiscount();
            }

            onCalculateValues()
        }
    }
}


function onClickAdd(idx) {
    var numItem = parseInt(document.getElementById('numberImg' + idx).innerHTML);
    if (!isNaN(numItem)) {
        numItem++;
        document.getElementById('numberImg' + idx).innerHTML = numItem;

        totalValue += valuesitens[idx - 1];

        if (discount > 0) {
            onApplyDiscount();
        }
        onCalculateValues()
    }
}

function onCalculateValues() {
    finalValue = totalValue - discount;
    $('#totalValue')[0].innerHTML = totalValue.toFixed(2);
    $('#discountValue')[0].innerHTML = discount.toFixed(2);
    $('#finalValue')[0].innerHTML = finalValue.toFixed(2);
}

function onRemoveDiscount() {
    discount = 0;
    $("#delDiscount")[0].hidden = true;
    $("#applyDiscount")[0].hidden = false;
    onCalculateValues();
}

function onApplyDiscount() {
    if (totalValue <= 0) {
        onRemoveDiscount()
    } else {
        let discountcoupon = $('#discountCoupon')[0].value;
        let percent = 0
        switch (discountcoupon) {
            case 'descont23': percent = 33.33;
                break;
            case 'cupom20': percent = 20; break;
            default: 0; break;
        }
        discount = parseFloat((percent / 100) * totalValue);


        $("#applyDiscount")[0].hidden = true;
        $("#delDiscount")[0].hidden = false;
    }
    onCalculateValues();

}