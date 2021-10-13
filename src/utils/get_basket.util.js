export const get_basket = () => {
  const basketValue = window.localStorage
    .getItem('basket')
    ?.split(' ')
    .filter((el) => !!el);
  const basketLength = basketValue?.length;

  return [basketValue, basketLength];
};
