
const createFilterMarkup = (filter, isChecked) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.name.toLowerCase()}">${filter.name}</label>
    </div>`
  );
};


export const createFiltersTemplate = (filters = []) => {
  const filtersMarkup = filters.map((filter, i) => createFilterMarkup(filter, i === 0)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
