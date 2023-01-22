"use strict";

class Clock extends HTMLElement {
  constructor() {
    super();

    this.init();
  }

  init() {
    const shadow = this.attachShadow({ mode: "open" });
    const container = this.createClockContainer();
    const clock = this.createClock();
    const styles = this.styles();

    shadow.appendChild(container).appendChild(clock);
    shadow.appendChild(styles);

    setInterval(this.updateClock.bind(this), 1000, [clock]);
  }

  styles() {
    const style = document.createElement("style");

    style.textContent = `
      .container {
        height: 35rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container .clock {
        font-size: 5rem;
      }`;

    return style;
  }

  convertTimeToString() {
    const hour = this.hour.toString().padStart(2, "0");
    const minutes = this.minutes.toString().padStart(2, "0");
    const seconds = this.seconds.toString().padStart(2, "0");

    return `${hour}:${minutes}:${seconds}`;
  }

  createClockContainer() {
    const clockContainer = document.createElement("div");
    clockContainer.classList.add("container");

    return clockContainer;
  }

  updateClock(args) {

    const clock = args[0];

    this.seconds++;
    if (this.seconds === 60) {
      this.minutes++;
      this.seconds = 0;
    }
    if (this.minutes === 60) {
      this.hour++;
      this.minutes = 0;
    }
    if (this.hour === 24) {
      this.hour = 0;
      this.minutes = 0;
      this.seconds = 0;
    }

    clock.innerHTML = this.convertTimeToString();
  }

  createClock() {
    const date = new Date();
    this.hour = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

    const clock = document.createElement("span");
    clock.classList.add("clock");

    clock.innerHTML = this.convertTimeToString();

    return clock;
  }
}

customElements.define("clock-lbl", Clock);