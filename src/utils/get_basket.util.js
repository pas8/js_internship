export const get_basket = () => {
  const basketValue = window.sessionStorage.getItem('basket')?.split(',');
  const basketLength = basketValue?.length;

  return [basketValue, basketLength];
};
