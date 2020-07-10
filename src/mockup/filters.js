const filters = [
  `Everything`,
  `Future`,
  `Past`
];

export const generateFilters = () => {
  return filters.map((filter) => {
    return {
      name: filter
    };
  });
};
