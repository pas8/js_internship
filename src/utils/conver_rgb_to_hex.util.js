export const conver_rgb_to_hex = (str) => {
  const [r, g, b] = str
    .split('rgb(')[1]
    .split(',')
    .map((__) => parseInt(__));

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
