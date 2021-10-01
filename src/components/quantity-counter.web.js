import '@styles/_web-quantity-counter.scss';
import arrowNextSvg from '@svgs/arrow_next.svg';
import arrowPrevSvg from '@svgs/arrow_prev.svg';

class QuantityCounter extends HTMLElement {
  constructor() {
    super();
    this.quantityValue = +this.getAttribute('value') || 1;
  }

  connectedCallback() {
    
    this.innerHTML = ` 
      <button class='quantity-counter__button-less'>
        ${arrowPrevSvg}
      </button>

      <p class='quantity-counter__value'>${this.quantityValue}</p>
      <button class='quantity-counter__button-more'>
        ${arrowNextSvg}
      </button>
    `;

    const quantityCounterButtonMoreNode = this.querySelector(`.quantity-counter__button-more`);
    const quantityCounterButtonLessNode = this.querySelector(`.quantity-counter__button-less`);

    const quantityCounterValueNode = this.querySelector(`.quantity-counter__value`);

    const handleUpdateCounterValue = () => {
      quantityCounterValueNode.innerHTML = this.quantityValue;
    };

    quantityCounterButtonLessNode.addEventListener('click', () => {
      this.quantityValue -= 1;
      handleUpdateCounterValue();
    });
    quantityCounterButtonMoreNode.addEventListener('click', () => {
      this.quantityValue += 1;
      handleUpdateCounterValue();
    });
  }
}

if (!customElements.get('quantity-counter')) customElements.define('quantity-counter', QuantityCounter);

