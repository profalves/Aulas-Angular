class CountDown extends HTMLElement {

    constructor() {
    
        super();
    
        this.init();
    }

    styles() {
        const style = document.createElement('style');
    
        style.textContent =
        `
        
            .botoes{
                margin-top: 10px;
                width: 10vw;
                text-align:center;
                
                
            }

            .botoes input{

                margin: 10px;           
                
            }
            
            .tempo{
                text-align: center;
                font-size: 3rem;
            }


        `
    
        return style
      }


    

    Hora(){

        const hours = document.createElement('span');
     
        hours.setAttribute('data-value', 0)
        hours.innerHTML = "00"

        return hours

    }

    Minuto(){


        const minutes = document.createElement('span');

        minutes.setAttribute('data-value', 57)        
        minutes.innerHTML = ":00:"

        return minutes

    }

    Segundo(){

        const seconds = document.createElement('span');

        seconds.setAttribute('data-value', 0)        
        seconds.innerHTML = "00" 

        return seconds

    }

    botaoStartStop(){

        const startStop = document.createElement('input');
        startStop.setAttribute("type", "button")
        startStop.setAttribute("value", "Start")

        startStop.addEventListener('click', this.startStopAction.bind(this));

        return startStop

    }

    botaoZerar(){

        const zerar = document.createElement('input');
        zerar.setAttribute("type", "button")        
        zerar.setAttribute("value", "Zerar")

        
        zerar.addEventListener('click', this.zerarCountdown.bind(this));

        return zerar

    }

    createContainer(classe) {
        const countdown = document.createElement('div');
        countdown.classList.add(classe);
    
        return countdown;
    }

    startStopAction(event){ 

        event.preventDefault();
        
        const valor = this.startStop.getAttribute("value");

        console.log(valor)

        if(valor == "Stop"){

            this.startStop.setAttribute("value", "Start");

        } else{
        
            this.startStop.setAttribute("value", "Stop");
        }
        
    

    }

    zerarCountdown(){

        this.seconds.innerHTML = "00" 
        this.minutes.innerHTML = ":00:"
        this.hours.innerHTML = "00"

        this.seconds.setAttribute('data-value', 0)
        this.minutes.setAttribute('data-value', 0)
        this.hours.setAttribute('data-value', 0)

    }
    

    init() {

        const shadow = this.attachShadow({mode: 'open'});

        const countdown = this.createContainer("countdown");
        const containerTempo = this.createContainer("tempo");
        const containerBotoes = this.createContainer("botoes");

        this.seconds = this.Segundo();
        this.minutes = this.Minuto();
        this.hours = this.Hora();
        this.startStop = this.botaoStartStop();
        this.zerar = this.botaoZerar();


        containerTempo.appendChild(this.hours)
        containerTempo.appendChild(this.minutes)
        containerTempo.appendChild(this.seconds)
        
        
        containerBotoes.appendChild(this.startStop)
        containerBotoes.appendChild(this.zerar)

        countdown.appendChild(containerTempo)        
        countdown.appendChild(containerBotoes)

        shadow.appendChild(countdown);
    
        shadow.appendChild(this.styles());

        setInterval(() => {

            const valor = this.startStop.getAttribute("value");
    
            if(valor === "Stop"){        
    
                const cs = Number(this.seconds.getAttribute('data-value')) + 1
                const cm = Number(this.minutes.getAttribute('data-value')) + 1
                const ch = Number(this.hours.getAttribute('data-value')) + 1
                let passou = 0
                //s = 
                //m = m < 10 ? "0" + cm : cm
                //h = h < 10 ? "0" + ch : ch
    
                this.seconds.innerText = cs < 10 ? "0" + cs : cs
                this.seconds.setAttribute('data-value', cs)
    
                if(cs > 59){
    
                    this.seconds.innerText = "00"
                    this.seconds.setAttribute('data-value', 0)            
    
                    this.minutes.innerText = cm < 10 ? ":"+ "0" + cm + ":" : ":" + cm + ":"
                    this.minutes.setAttribute('data-value', cm)
    
                    passou = 1
    
                }
    
                if(cm + passou > 60){
    
                    this.minutes.innerText = ":00:"
                    this.minutes.setAttribute('data-value', 0)
    
                    this.hours.innerText = ch < 10 ? "0" + ch : ch
                    this.hours.setAttribute('data-value', ch)
    
                }   
            
            }
    
            
    
        }, 1000) 
      
    }

}


customElements.define('count-down', CountDown);