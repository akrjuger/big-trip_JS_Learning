import TripInfoComponent from '../components/trip-info.js';
import {renderElement, replace} from '../utils/render.js';

export default class TripInfoController {
  constructor(container, eventsModel, statsComponent) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._statsCompomemt = statsComponent;

    this._tripInfoComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    this._oldTripInfoComponent = this._tripInfoComponent;
    this._tripInfoComponent = new TripInfoComponent(this._eventsModel.getEventsAll());

    if (this._oldTripInfoComponent) {
      replace(this._tripInfoComponent, this._oldTripInfoComponent);
    }
    renderElement(this._container, this._tripInfoComponent, `afterbegin`);
  }

  _onDataChange() {
    this.render();
    this._statsCompomemt.rerender(this._eventsModel.getEventsAll());
  }
}
