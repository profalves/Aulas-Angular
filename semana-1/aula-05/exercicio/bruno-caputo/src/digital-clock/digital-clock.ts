import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("digital-clock")
export class DigitalClock extends LitElement {
  constructor() {
    super();

    this.createClock();
    setInterval(this.updateClock.bind(this), 1000);
  }

  static styles = css`
    .container {
      width: 45rem;
      height: 35rem;
      margin: 0 auto;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container .clock {
      font-size: 5rem;
    }
  `;

  @state()
  private hour: number = 0;

  @state()
  private minutes: number = 0;

  @state()
  private seconds: number = 0;

  private convertTimeToString() {
    const hour = this.hour.toString().padStart(2, "0");
    const minutes = this.minutes.toString().padStart(2, "0");
    const seconds = this.seconds.toString().padStart(2, "0");

    return `${hour}:${minutes}:${seconds}`;
  }

  private createClock() {
    const date = new Date();
    this.hour = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
  }

  private updateClock() {
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

    this.requestUpdate();
  }

  render() {
    return html`
      <div class="container">
        <span class="clock">${this.convertTimeToString()}</span>
      </div>
    `;
  }
}
