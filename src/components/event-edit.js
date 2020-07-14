import AbstractSmartComponent from './abstract-smart-component.js';
import {EVENT_TYPES, EVENT_ICONS} from '../const.js';
import {TOWNS, SERVICES} from '../mockup/event.js';
import {getEventTitle} from '../utils/events.js';
import {getDateAndTimeFormatString} from '../utils/common.js';

const createTypeMarkup = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
};

const createTownOptionMarkup = (town) => {
  return (
    `<option value="${town}"></option>`
  );
};

const createServiceMarkup = (service, isChecked) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${service.type}-1" type="checkbox" name="event-offer-${service.type}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${service.type}-1">
        <span class="event__offer-title">${service.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${service.price}</span>
      </label>
    </div>`
  );
};

const createDestinationMarkup = (event) => {
  const eventPhotos = event.photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`);

  if (EVENT_TYPES.moving.includes(event.type)) {
    return ``;
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${event.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPhotos}
        </div>
      </div>
    </section>`
  );
};

const createEventEditTemplate = (event) => {
  const placeTypesMarkup = EVENT_TYPES.place.map((type) => createTypeMarkup(type)).join(`\n`);
  const movingTypesMarkup = EVENT_TYPES.moving.map((type) => createTypeMarkup(type)).join(`\n`);
  const townsOptionMarkup = TOWNS.map((town) => createTownOptionMarkup(town)).join(`\n`);
  const servicesMarkup = SERVICES.map((service) => createServiceMarkup(service, event.services.includes(service))).join(`\n`);


  const eventTitle = getEventTitle(event);
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${EVENT_ICONS[event.type]}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${movingTypesMarkup}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${placeTypesMarkup}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventTitle}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.town}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${townsOptionMarkup}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateAndTimeFormatString(event.startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateAndTimeFormatString(event.endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${servicesMarkup}
        </section>

        ${createDestinationMarkup(event)}

      </section>
    </form>`
  );
};

export default class EventEditComponent extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;

    this._submitHandler = null;
    this._setTypeChangeHandler = this._setTypeChangeHandler.bind(this);
    this._setTownChangeHandler = this._setTownChangeHandler.bind(this);
    this.setSubmitHandler = this.setSubmitHandler.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setSubmitHandler(this._submitHandler);
  }

  _subscribeOnEvents() {
    this._setTypeChangeHandler();
    this._setTownChangeHandler();
  }

  _setTypeChangeHandler() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      if (evt.target.nodeName !== `LABEL`) {
        return;
      }
      const selectedType = evt.target.innerText;
      if (this._event.type === selectedType) {
        return;
      }

      this._event.type = selectedType;

      this.rerender();
    });
  }

  _setTownChangeHandler() {
    const townInput = this.getElement().querySelector(`.event__input--destination`);
    townInput.addEventListener(`change`, () => {
      this._event.town = townInput.value;
      this.rerender();
    });
  }

}
