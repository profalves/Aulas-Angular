'use strict';

class DigitalClock extends HTMLElement {
	connectedCallback() {
		setInterval(() => {
			this.getTime();
		}, 1000);
	}

	getTime() {
		let date = new Date();

		let hour = this.querySelector(".hour");
		let minutes = this.querySelector(".minutes");
		let seconds = this.querySelector(".seconds");

		hour.innerHTML = date.getHours();
		minutes.innerHTML = date.getMinutes();
		seconds.innerHTML = date.getSeconds();
	}
}

customElements.define("digital-clock", DigitalClock);
