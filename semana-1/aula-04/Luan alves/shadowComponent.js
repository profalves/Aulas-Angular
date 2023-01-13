class Clock extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <style>
          div{
            text-shadow: 0px 0px 10px #00000082;
          }
          .clock {
            position: relative;
            font-size: 4rem;
            color: #fff;
            font-weight: 100;
            text-align: center;
          }
          .date{
            text-align: center;
            color: #fff;
            font-size: 1.5rem;
            font-weight: 500;
            letter-spacing: .2rem;
          }
        </style>
        <div class="clock"></div>
        <div class="date"><div>
      `;

      this.clockDiv = shadowRoot.querySelector('.clock');
      this.dateDiv = shadowRoot.querySelector('.date');
      this.time = '';
    }
  
    connectedCallback() {
      this.getDate();
      this.updateTime();
      setInterval(() => this.updateTime(), 1000);
    }
    
    getDate(){
      this.date = new Date().toLocaleDateString()
      
      this.dateDiv.textContent = this.date;
    }

    updateTime() {
      this.time = new Date().toLocaleTimeString();
      this.clockDiv.textContent = this.time;
    }
  }
  
  customElements.define('clock-component', Clock);