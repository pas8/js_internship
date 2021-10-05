import { get_random_int } from '@utils/get_random_int.util.js';
import '@styles/_web-time-left.scss';

class TimeLeft extends HTMLElement {
  connectedCallback() {
    this.defaultTimerValuesArr = [
      { caption: 'Day', max: 31 },
      { caption: 'Hours', max: 24 },
      { caption: 'Mins', max: 60 },
      { caption: 'Secs', max: 60 },
    ];
    this.secondsLeft = 0;
    this.innerHTML = `<div class='time'> ${this.defaultTimerValuesArr
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

    let timenumbersArr = [];
    const timeContainer = document.querySelector('.time');
    const timeItemsNodeArr = [...timeContainer.children];

    timeItemsNodeArr.forEach((el) => {
      timenumbersArr.push(+el.children[0].innerHTML);
    });
    let secondsToLeftArr = [];

    timenumbersArr.reverse().reduce((acc, el) => {
      secondsToLeftArr.push(acc);
      return acc * el;
    }, 1);
    // setInterval(() => {
    //   timeContainer.innerHTML = [...secondsToLeftArr].reverse().map((value, idx) => {
    //     console.log(~~(value),this.secondsLeft * [...timenumbersArr].reverse()[idx]);
    //     return `<div class='time-item'><p class='time-item__value'>${1} </p><p class='time-item__caption'>${
    //       this.defaultTimerValuesArr[idx].caption
    //     }</p>${idx !== 3 ? `<p class='time-item__dispencer'>:</p>` : ''}</div>`;
    //   });
    //   console.log();
    //   this.secondsLeft += 1;
    // }, 1000);
  }
}
if (!customElements.get('time-left')) customElements.define('time-left', TimeLeft);
