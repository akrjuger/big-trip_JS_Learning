import FiltersComponent from '../components/filters.js';
import {renderElement} from '../utils/render.js';
import {generateFilters} from '../mockup/filters.js';

export default class FiltersController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filters = generateFilters();

    this._filtersComponent = null;
  }

  render() {
    this._filtersComponent = new FiltersComponent(this._filters);
    renderElement(this._container, this._filtersComponent, `beforeend`);
  }
}
