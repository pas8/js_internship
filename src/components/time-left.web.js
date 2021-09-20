import {get_random_int} from  '@utils/get_random_int.util.js'
import '@styles/_web-time-left.scss'
class TimeLeft extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class='time'> ${[
      { caption: 'Day', max: 31 },
      { caption: 'Hours', max: 24 },
      { caption: 'Mins', max: 60 },
      { caption: 'Secs', max: 60 },
    ]
      .map(
        ({ caption, max }, idx) =>
          `<div class='time-item'><p class='time-item__value'>${get_random_int(
            1,
            max
          )} </p><p class='time-item__caption'>${caption}</p>${
            idx !== 3 ? `<p class='time-item__dispencer'>:</p>` : ''
          }</div>`
      )
      .join('')} </div>`;
  }
}

customElements.define('time-left', TimeLeft);