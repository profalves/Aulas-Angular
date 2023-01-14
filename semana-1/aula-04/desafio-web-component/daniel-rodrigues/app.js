"use strict";

class Clock extends HTMLElement {
    connectedCallback() {
		setInterval(() => {
            let now = new Date();
            this.querySelector(".hours").innerHTML = now.getHours().toString().padStart(2, "0");
            this.querySelector(".minutes").innerHTML = now.getMinutes().toString().padStart(2, "0");
            this.querySelector(".seconds").innerHTML = now.getSeconds().toString().padStart(2, "0");
		}, 1000);
	}
}

customElements.define("digital-clock", Clock);