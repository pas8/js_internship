export const get_random_int = (min, max) => ~~(Math.random() * (~~max - Math.ceil(min)) + Math.ceil(min));
