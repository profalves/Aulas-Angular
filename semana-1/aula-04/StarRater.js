class StarRater extends HTMLElement {
  constructor() {
    super();

    this.init();
  }

  styles() {
    const style = document.createElement('style');

    style.textContent = `
      .star {
        font-size: 3rem;
        color: gray;
        cursor: pointer;
      }
    `

    return style
  }

  createContainer() {
    const rater = document.createElement('div');
    rater.classList.add('star-rater');

    rater.addEventListener('mouseleave', this.reset.bind(this));
    return rater;
  }

  createStars () {
    const createStar = (_, index) => {
      const star = document.createElement('span');
      star.classList.add('star');
      star.setAttribute('data-value', Number(index) + 1);
      star.innerHTML = '&#9733'

      star.addEventListener('click', this.setRating.bind(this));
      star.addEventListener('mouseover', this.ratingHover.bind(this));

      return star;
    }

    return Array.from({length: 5}, createStar); // (value, index, array) => {}
  }

  setRating(event) {
    this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));
  }

  ratingHover(event) {
    this.currentRating = event.currentTarget.getAttribute('data-value');
    console.log(this.currentRating);

    this.hightlightRating();
  }

  hightlightRating() {
    this.stars.forEach(star => {
      star.style.color = this.currentRating >= star.getAttribute('data-value') ? '#f92' : 'gray';
    })
  }

  reset() {
    this.currentRating = this.getAttribute('data-rating');
    this.hightlightRating();
  }

  init() {
    const shadow = this.attachShadow({mode: 'open'});

    const rater = this.createContainer();

    this.stars = this.createStars();

    this.stars.forEach(span =>  rater.appendChild(span)); 

    shadow.appendChild(rater);

    shadow.appendChild(this.styles());
  }
}

customElements.define('star-rater', StarRater);