export const toCamelCase = (str: string = '') => {
   return str
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map((el) => el[0].toUpperCase() + el.substring(1, el.length))
      .join(' ');
};
