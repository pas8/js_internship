import { get_sum_from_arr } from '@utils/get_sum_from_arr.util.js';

export const use_to_count_total_value = (className) => () => {
  const pricesNodeArr = document.querySelectorAll('.' + className);
  let pricesValuesArr = [];
  pricesNodeArr.forEach((el) => {
    pricesValuesArr.push(Number.parseFloat(el.textContent));
  });

  return get_sum_from_arr(pricesValuesArr);
};
