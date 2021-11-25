export const convert_rem_to_pixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
