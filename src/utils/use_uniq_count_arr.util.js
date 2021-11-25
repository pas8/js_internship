export const use_uniq_count_arr = (arr) =>
  arr.reduce(
    (acc, el) =>
      acc.some(({ id }) => id === el)
        ? acc.map((__) => (__.id === el ? { ...__, count: __.count + 1 } : __))
        : [...acc, { id: el, count: 1 }],
    []
  );
