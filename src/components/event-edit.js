import AbstractSmartComponent from './abstract-smart-component.js';
import {EVENT_TYPES, EVENT_ICONS} from '../const.js';
import {TOWNS, SERVICES} from '../mockup/event.js';
import {getEventTitle} from '../utils/events.js';
import {getDateAndTimeFormatString, getDateFromString} from '../utils/common.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

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

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
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

    this._flatpickr = [];
    this._submitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._setTypeChangeHandler = this._setTypeChangeHandler.bind(this);
    this._setTownChangeHandler = this._setTownChangeHandler.bind(this);
    this.setSubmitHandler = this.setSubmitHandler.bind(this);
    this.setSubmitHandler = this.setSubmitHandler.bind(this);
    this.setFavoriteButtonClickHandler = this.setFavoriteButtonClickHandler.bind(this);

    this._applyFlatpickr = this._applyFlatpickr.bind(this);
    this._subscribeOnEvents();
    this._applyFlatpickr();
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
    this._applyFlatpickr();
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

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, handler);
    this._favoriteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    // BUG in flatpickr!!!
    // if (this._flatpickr.length > 0) {
    //   this._flatpickr.forEach((item) => item.destroy());
    //   this._flatpickr = [];
    // }

    const datesInput = Array.from(this.getElement().querySelectorAll(`.event__input--time`));
    this._flatpickr = datesInput.map((dateInput, index) => {
      return flatpickr(dateInput, {
        altInput: true,
        allowInput: true,
        enableTime: true,
        altFormat: `d/m/y H:i`,
        dateFormat: `d/m/y H:i`,
        onClose: (selectedDays, dateStr) => {
          if (index === 0) {
            this._event.startDate = getDateFromString(dateStr);
            if (this._event.startDate > this._event.endDate) {
              this._event.endDate = this._event.startDate;
            }
          } else {
            this._event.endDate = getDateFromString(dateStr);
          }

          this.rerender();
        }
      });
    });
  }
}
