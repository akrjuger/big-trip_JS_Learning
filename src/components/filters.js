import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';

const createFilterMarkup = (filter, isChecked) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.name.toLowerCase()}">${filter.name}</label>
    </div>`
  );
};


const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((filter, i) => createFilterMarkup(filter, i === 0)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FiltersComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._currentFilter = FilterType.EVERYTHING;

    this.setFilterChangeHandler = this.setFilterChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.nodeName !== `LABEL`) {
        return;
      }
      const selectedFilter = evt.target.innerText.toLowerCase();
      if (this._currentFilter === selectedFilter) {
        return;
      }

      this._currentFilter = selectedFilter;

      handler(selectedFilter);
    });
  }
}
