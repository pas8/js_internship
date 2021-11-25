import i1 from '@assets/food1.jpeg';
import i2 from '@assets/food2.jpeg';
import i3 from '@assets/food3.jpeg';
import i4 from '@assets/food4.jpeg';
import i5 from '@assets/food5.jpeg';
import i6 from '@assets/food6.jpeg';
import i7 from '@assets/food7.jpeg';
import i8 from '@assets/food8.jpeg';
import i9 from '@assets/food9.jpeg';
import i10 from '@assets/food10.jpeg';

import { get_random_int } from '@utils/get_random_int.util.js';

export const get_random_img = () => {
  const f = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10];
  return f[get_random_int(0, f.length)];
};
