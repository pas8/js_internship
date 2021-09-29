import { use_debounce } from '@utils/use_debounce.util';

export const get_double_range_values = () => {
  const g = document.getElementById('double-range');

  // let j = [];

  [...g.children].slice(1).map((el) => {
    console.log(el);
    el.addEventListener('input', function () {
      use_debounce(function () {
        console.olog(';u');
      }, 250);
    });
  });
};
