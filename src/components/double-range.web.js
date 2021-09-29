import '@styles/range.scss';

class DoubleRange extends HTMLElement {
  connectedCallback() {
    this.step = +(this.getAttribute('step') || 1);
    this.max = +(this.getAttribute('max') || 100);
    this.min = +(this.getAttribute('max') || 0);
    this.defaultStartValue = +this.getAttribute('default-start-Value') || this.min;
    this.defaultEndValue = +this.getAttribute('default-end-Value') || this.max;
    this.innerHTML = `
    <div slider id="double-range">
      <div>
        <div inverse-left style="width:70%;"></div>
        <div inverse-right style="width:70%;"></div>
        <div range style="left:0%;right:0%;"></div>
        <span thumb style="left:0%;"></span>
        <span thumb style="left:100%;"></span>
        <div sign style="left:0%;">
          <span id="value">0</span>
        </div>
        <div sign style="left:100%;">
          <span id="value">100</span>
        </div>
      </div>
      <input type="range" value='${this.defaultStartValue}' max='${this.max - 1}' min='${this.min}' step='${this.step}' class='firstRangePart' />
      <input type="range" value='${this.defaultEndValue}' max='${this.max}' min='${this.min}' step='${this.step}' class='secondRangePart'/>
    </div>
    `;

    const firstRangePart = document.querySelector('.firstRangePart');
    const secondRangePart = document.querySelector('.secondRangePart');

    firstRangePart.addEventListener('input', function () {
      this.value = Math.min(this.value, this.parentNode.childNodes[5].value - 1);
      let value = (this.value / parseInt(this.max)) * 100;
      var children = this.parentNode.childNodes[1].childNodes;
      children[1].style.width = value + '%';
      children[5].style.left = value + '%';
      children[7].style.left = value + '%';
      children[11].style.left = value + '%';
      children[11].childNodes[1].innerHTML = this.value;
    });

    secondRangePart.addEventListener('input', function () {
      this.value = Math.max(this.value, this.parentNode.childNodes[3].value - -1);
      let value = (this.value / parseInt(this.max)) * 100;
      var children = this.parentNode.childNodes[1].childNodes;
      children[3].style.width = 100 - value + '%';
      children[5].style.right = 100 - value + '%';
      children[9].style.left = value + '%';
      children[13].style.left = value + '%';
      children[13].childNodes[1].innerHTML = this.value;
    });
  }
}

if (!customElements.get('double-range')) customElements.define('double-range', DoubleRange);
