export const use_validation_of_all_field = (data) => {
  const empty_field = Object.entries(data).reduce((a, [key, value]) => {
    const isEmpty = !value?.length || value?.length == 0;
    return isEmpty ? key : a;
  }, '');

  return empty_field;
};
