// Class Clock, it will t=give birth to my clock
class Clock extends HTMLElement {

	// COnstructor to call init function
	constructor() {
		super();

		this.init();
	}

	// The style to form to my clock
	styles() {
		const style = document.createElement('style');

		style.textContent = `
		#clock {
			text-align: center;
			width: 80%;
			height: 300px;
			padding: 1em;
			margin: auto;
			background-color: #eee;
			border: 1px solid #666;
			border-radius: 10px;
			color: red;
			font-size: 64px;
			font-weight: bolder;
		}`

		return style;
	}

	// Function to create the p element, the clock.
	creatPElement() {
		const clock = document.createElement('p');
		clock.id = 'clock';

		setInterval(() => {
			clock.innerHTML = this.clockFunction();
		}, 1000);


		return clock;
	}

	// Function that make the clock works;
	clockFunction() {
		let date = new Date();
		let hh = date.getHours();
		let mm = date.getMinutes();
		let ss = date.getSeconds();

		ss = (ss < 10) ? '0' + ss : ss;
		mm = (mm < 10) ? '0' + mm : mm;
		hh = (hh < 10) ? '0' + hh : hh;

		let time = hh + ":" + mm + ":" + ss;

		return time;
	}

	// Function where i put the things that I want to starts along the app initialization.
	init() {

		const shadow = this.attachShadow({
			mode: 'open'
		});

		const clock = this.creatPElement();

		shadow.appendChild(clock);
		shadow.appendChild(this.styles());

		this.clockFunction();
	}
}

// Where I define my element, (my component), name, and set the component i want.
customElements.define('clock-component', Clock);