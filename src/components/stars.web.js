import '@styles/_web-stars.scss';

class Stars extends HTMLElement {
  connectedCallback() {
    const value = this.getAttribute('value');

    this.innerHTML = ` <div class='stars'>
      ${Array(5)
        .fill(null)
        .map(
          (__, idx) =>
            `<svg viewBox='0 0 24 24'>
            <path
              fill=${+value <= idx ? 'none' : 'currentColor'}
              stroke='currentColor'
              d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z'
            ></path>
          </svg>`
        )
        .join('')}
      </div>`;
  }
}

customElements.define('stars-feedback', Stars);
