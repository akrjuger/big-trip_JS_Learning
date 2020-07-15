import FiltersComponent from '../components/filters.js';
import {renderElement} from '../utils/render.js';
import {generateFilters} from '../mockup/filters.js';

export default class FiltersController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filters = generateFilters();

    this._filtersComponent = null;

    this._onViewChange = this._onViewChange.bind(this);
  }

  render() {
    this._filtersComponent = new FiltersComponent(this._filters);

    this._filtersComponent.setFilterChangeHandler(this._onViewChange);

    renderElement(this._container, this._filtersComponent, `beforeend`);
  }

  _onViewChange(newFilter) {
    this._eventsModel.setFilter(newFilter);
  }
}
