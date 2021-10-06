import { get_random_int } from '@utils/get_random_int.util.js';
import '@styles/_web-time-left.scss';

class TimeLeft extends HTMLElement {
  connectedCallback() {
    const handleUpdateTImer = (timeArr) => {
      this.innerHTML = `<div class='time'> ${timeArr.map_join(
        ({ caption, time }, idx) =>
          `<div class='time-item'><p class='time-item__value'>${Math.trunc(
            time
          )} </p><p class='time-item__caption'>${caption}</p>${
            idx !== 3 ? `<p class='time-item__dispencer'>:</p>` : ''
          }</div>`
      )} </div>`;
    };

    let timeMinut = get_random_int(60 * 60 * 24 * 1, 60 * 60 * 24 * 31);

    const timer = setInterval(function () {
      let seconds = timeMinut % 60;
      let minutes = (timeMinut / 60) % 60;
      let hour = (timeMinut / 60 / 60) % 24;
      let day = (timeMinut / 60 / 60 / 24) % 31;

      let timeArr = [
        { caption: 'Day', time: day },
        { caption: 'Hours', time: hour },
        { caption: 'Mins', time: minutes },
        { caption: 'Secs', time: seconds },
      ];
      if (timeMinut <= 0) {
        clearInterval(timer);
        return alert('Fuck you');
      }

      handleUpdateTImer(timeArr);

      --timeMinut;
    }, 1000);
  }
}
if (!customElements.get('time-left')) customElements.define('time-left', TimeLeft);
