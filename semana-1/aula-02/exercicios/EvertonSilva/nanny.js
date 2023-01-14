import { Nanny, html } from "https://cdn.skypack.dev/nanny-state"

const View = state => state.HTML`
<div class="d-flex flex-column justify-content-center align-items-center">
${state.percent > 0 ?
        html`<h5>Cupon: <label class="text-info text-uppercase">${state.coupon}</label></h5>
<h6>Desconto: <label class="text-info">${state.percent}%</label></h6>` :
        html`<button class="btn btn-outline-primary" onclick=${genCoupon}>Gerar Cupon</button>`}
</div>
<div class="d-flex mt-3">
<button type="button" id="btnCopy" class="btn btn-block btn-secondary" data-bs-target="#modalCoupon" data-toggle="tooltip" title="Cupom copiado!">Copiar Cupom</button>
</div>`

$(document).ready(function () {
    $("#btnCopy").click(function () {
        navigator.clipboard.writeText(coupon.coupon);

        $('#btnCopy').tooltip('show');
        setTimeout(() => {
            $('#btnCopy').tooltip('hide');
            $('#modalCoupon').modal("hide");
            setTimeout(() => {
                $('#modalCoupon').modal('dispose');
            }, 100)
        }, 1000)
    });
});

var coupon = {
    coupon: "",
    percent: 0,
};

const genCoupon = state => {
    coupon = addCoupon(Math.random() < 0.5);
    Update(coupon)
}

const addCoupon = (cp) => ({
    coupon: cp ? "descont23" : "cupom20",
    percent: cp ? 33.33 : 20,
})

const State = {
    coupon,
    View,
    Element: document.getElementById('mainMCoupon'),
}
const Update = Nanny(State)