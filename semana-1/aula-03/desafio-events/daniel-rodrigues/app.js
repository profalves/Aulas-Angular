import { Nanny, html } from "https://cdn.skypack.dev/nanny-state";

const View = (state) => html`
<div class="container" style="width: 90vw; height: 90vh; padding: 20vh 5vw; margin: 5vh 5vw; background-color: #f4f4f4;">
  <div class="row" style="text-align: center;">
    <h1>Assine nossa newsletter!</h1>
  </div>
  <div class="row" style="text-align: center;">
    <h3>Assine nossa newsletter e fique por dentro das novidades.</h3>
  </div>
    <div style="width: 500px; margin: auto;">
        <div class="input-group">
            <input id="email" class="form-control" aria-label="..." onkeyup="${() => {
                var inputValue = document.getElementById("email").value;
                state.validateEmail(inputValue);
            }}">
            <span class="input-group-btn">
                <button onclick="${() => {
                    state.confirmSubscription(state);
                }}"
                class="btn btn-primary">Assinar Newsletter</button>
            </span>
        </div>
    </div>
    <div id="valid" class="row" style="text-align: center; display: none;">
      <h4>Esse e-mail não é válido!</h4>
    </div>
    <div id="unvalid" class="row" style="text-align: center; display: none;">
      <h4>E-mail validado. Obrigado por assinar nossa newsletter!</h4>
    </div>
</div>
`;

const validateEmail = (inputValue) => {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(inputValue)) {
        document.getElementById('email').style.borderColor='green';
        return  Update({
            validEmail: true
        });
    }
    else {
        document.getElementById('email').style.borderColor='red';
        return  Update({
            validEmail: false
        });
    }
}

const confirmSubscription = (state) => {
    if(state.validEmail) {
        document.getElementById('valid').style.display='none';
        document.getElementById('unvalid').style.display='block';
    }
    else {
        document.getElementById('valid').style.display='block';
        document.getElementById('unvalid').style.display='none';
    }
}

const State = {
    validEmail: false,
    confirmSubscription,
    validateEmail,
    View,
};

const Update = Nanny(State);