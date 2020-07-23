import AbstractSmartComponent from './abstract-smart-component.js';
import {EVENT_TYPES, EVENT_ICONS} from '../const.js';
// import {SERVICES} from '../mockup/event.js';
import {getEventTitle} from '../utils/events.js';
import {getDateAndTimeFormatString, getDateFromString} from '../utils/common.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const Mode = {
  EDIT: `edit`,
  ADD: `add`
};

const createTypeMarkup = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
};

const createDestinationOptionMarkup = (town) => {
  return (
    `<option value="${town}"></option>`
  );
};

const createOfferMarkup = (offer, isChecked) => {
  const offerId = offer.title.toLowerCase().replace(` `, ``);
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}-1" type="checkbox" name="event-offer-${offerId}" ${isChecked ? `checked` : ``} value="${offer.title}">
      <label class="event__offer-label" for="event-offer-${offerId}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createCloseButtonMarkup = (mode) => {
  if (mode === Mode.ADD) {
    return ``;
  }
  return (
    `        <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>`
  );
};

const createDestinationMarkup = (event) => {
  const eventPhotos = event.destination.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`);

  // if (EVENT_TYPES.moving.includes(event.type)) {
  //   return ``;
  // }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${event.destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPhotos}
        </div>
      </div>
    </section>`
  );
};

const createEventEditTemplate = (event, mode, destinations, offers) => {
  const placeTypesMarkup = EVENT_TYPES.place.map((type) => createTypeMarkup(type)).join(`\n`);
  const movingTypesMarkup = EVENT_TYPES.moving.map((type) => createTypeMarkup(type)).join(`\n`);
  const destinationsOptionMarkup = destinations.map((destination) => createDestinationOptionMarkup(destination.name)).join(`\n`);
  const offersForThisType = offers.find((offersForType) => offersForType.type === event.type.toLowerCase());
  const offersMarkup = offersForThisType.offers.map((offer) => {
    const eventOffersTitiles = event.offers.map((eventOffer) => eventOffer.title);
    return createOfferMarkup(offer, eventOffersTitiles.includes(offer.title));
  }).join(`\n`);
  const closeButtonMarkup = createCloseButtonMarkup(mode);


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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsOptionMarkup}
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
        <button class="event__reset-btn" type="reset">${mode === Mode.EDIT ? `Delete` : `Cancel`}</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        ${closeButtonMarkup}
      </header>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersMarkup}
        </section>

        ${createDestinationMarkup(event)}

      </section>
    </form>`
  );
};

export default class EventEditComponent extends AbstractSmartComponent {
  constructor(event, mode = Mode.EDIT, destinations, offers) {
    super();
    this._event = event;
    this._oldEvent = JSON.parse(JSON.stringify(event));
    this._destinations = destinations;
    this._offers = offers;

    this._mode = mode;
    this._flatpickr = [];

    this._submitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._deleteButtonClickHandler = null;
    this._closeButtonClickHandler = null;

    this._setTypeChangeHandler = this._setTypeChangeHandler.bind(this);
    this._setDestinationChangeHandler = this._setDestinationChangeHandler.bind(this);
    this._setOffersChangeHandler = this._setOffersChangeHandler.bind(this);
    this.setSubmitHandler = this.setSubmitHandler.bind(this);
    this.setSubmitHandler = this.setSubmitHandler.bind(this);
    this.setFavoriteButtonClickHandler = this.setFavoriteButtonClickHandler.bind(this);
    this.setDeleteButtonClickHandler = this.setDeleteButtonClickHandler.bind(this);
    this.setCloseButtonClickHandler = this.setCloseButtonClickHandler.bind(this);

    this._applyFlatpickr = this._applyFlatpickr.bind(this);
    this._subscribeOnEvents();
    this._applyFlatpickr();
  }

  getTemplate() {
    return createEventEditTemplate(this._event, this._mode, this._destinations, this._offers);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  getData() {
    this._event.price = this.getElement().querySelector(`.event__input--price`).value;
    return this._event;
  }

  recoveryListeners() {
    this._subscribeOnEvents();

    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);

    this._applyFlatpickr();
  }

  _subscribeOnEvents() {
    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setOffersChangeHandler();
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

  _setDestinationChangeHandler() {
    const destinationInput = this.getElement().querySelector(`.event__input--destination`);
    destinationInput.addEventListener(`change`, () => {
      const destinationIndex = this._destinations.findIndex((destination) => destination.name === destinationInput.value);
      if (destinationIndex === -1) {
        return;
      }
      this._event.destination = this._destinations[destinationIndex];
      this.rerender();
    });
  }

  _setOffersChangeHandler() {
    this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, (evt) => {

      const selectedOffer = evt.target.value;

      let offerWasSelectedBefore = false;
      this._event.offers.forEach((offer) => {
        if (offer.title === selectedOffer) {
          this._event.offers = this._event.offers.filter((it) => (it.title !== selectedOffer));
          offerWasSelectedBefore = true;
        }
      });
      if (offerWasSelectedBefore) {
        return;
      }
      // this._event.offers.push(SERVICES.find((sevice) => sevice.title === selectedService));
    });
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, handler);
    this._favoriteButtonClickHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
    this._deleteButtonClickHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    if (this._mode === Mode.EDIT) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
      this._closeButtonClickHandler = handler;
    }
  }

  reset() {
    this._event = JSON.parse(JSON.stringify(this._oldEvent));
    this.rerender();
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
