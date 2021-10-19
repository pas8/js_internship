export const convert_arr_values_to_obj = (arr) =>
  arr.reduce((acc, el, idx) => (!(idx & 1) ? [acc[0], el.value] : [{ ...acc[0], [acc[1]]: el.value }]), [{}])[0];
