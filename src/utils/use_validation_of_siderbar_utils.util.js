import { use_xml_http_request } from '@utils/use_xml_http_request.util.js';

export const use_validation_of_siderbar_utils = async (allProductsArr) => {
  let categoriesArr = [];
  let categoriesIdsArr = [];
  let colorsArr = ['green', 'yellow', 'blue'];
  let pricesArr = [];
  let sizeArr = [];

  allProductsArr.forEach(async ({ categories, price, size }) => {
    categories.forEach((id) => {
      !categoriesIdsArr.includes(id) && categoriesIdsArr.push(id);
    });
    !sizeArr.includes(+size) && sizeArr.push(+size);
    pricesArr.push(price);
  });

  const categoriesResultArr = await Promise.all(
    categoriesIdsArr.map((id) => use_xml_http_request(`categories?id=${id}`))
  );

  categoriesResultArr.forEach(([item, error]) => {
    !error && categoriesArr.push(JSON.parse(item));
  }); 

  return [categoriesArr, colorsArr, sizeArr, Math.max(...pricesArr), ~~Math.min(...pricesArr)];
};

// import { use_uniq_count_arr } from '@utils/use_uniq_count_arr.util.js';

// const toDataURL = (url) =>
//   fetch(url)
//     .then((response) => response.blob())
//     .then(
//       (blob) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(blob);
//         })
//     );

// const get_average_rgb = (img) => {
//   var context = document.createElement('canvas').getContext('2d');
//   if (typeof img == 'string') {
//     var src = img;
//     img = new Image();
//     img.setAttribute('crossOrigin', '');
//     img.src = src;
//   }
//   context.imageSmoothingEnabled = true;
//   context.drawImage(img, 0, 0, 1, 1);
//   return context.getImageData(1, 1, 1, 1).data.slice(0, 3);
// };

// function modeArray(array) {
//   if (array.length == 0) return null;
//   var modeMap = {},
//     maxCount = 1,
//     modes = [];

//   for (var i = 0; i < array.length; i++) {
//     var el = array[i];

//     if (modeMap[el] == null) modeMap[el] = 1;
//     else modeMap[el]++;

//     if (modeMap[el] > maxCount) {
//       modes = [el];
//       maxCount = modeMap[el];
//     } else if (modeMap[el] == maxCount) {
//       modes.push(el);
//       maxCount = modeMap[el];
//     }
//   }
//   return modes;
// }

// function buf2hex(buffer) {
//   // buffer is an ArrayBuffer
//   return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
// }

// function _base64ToArrayBuffer(base64) {
//   var binary_string = window.atob(base64);
//   var len = binary_string.length;
//   var bytes = new Uint8Array(len);
//   for (var i = 0; i < len; i++) {
//     bytes[i] = binary_string.charCodeAt(i);
//   }
//   return bytes;
// }
