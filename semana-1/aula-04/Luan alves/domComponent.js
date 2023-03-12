class playerComponent extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <div class="player-container">
            <img class="player-cover" src="https://akamai.sscdn.co/uploadfile/letras/albuns/6/9/d/1/21591666040730.jpg" alt="">

            <div class="player-display">
                <span class="player-display-title"> I Miss You </span>
                <span class="player-display-author"> Blink-182 </span>
                <span class="player-display-timeline"> </span>
            </div>
        </div>
        `;
    }

}

customElements.define('player-component', playerComponent)