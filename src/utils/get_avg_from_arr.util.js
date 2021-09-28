export const get_avg_from_arr = (arr) => {
  return arr.reduce((acc, el) => acc + el, 0) / arr.length;
};
