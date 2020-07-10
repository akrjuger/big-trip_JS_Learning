import AbstractComponent from './abstract-component.js';
import {EVENT_ICONS} from '../const.js';
import {getEventTitle} from '../utils/events.js';

const getStringForTime = (data) => {
  return (`0` + data).slice(-2);
};

const getOfferMarkup = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const getDurationMarkup = (event) => {
  const durationTime = new Date(event.endDate - event.startDate);
  const durationDays = durationTime.getUTCDate() - 1;
  const durationHours = durationTime.getUTCHours();
  const durationMinutes = durationTime.getUTCMinutes();
  return (
    `${durationDays > 0 ? `${getStringForTime(durationDays)}D ` : ``}${durationHours > 0 ? `${getStringForTime(durationHours)}H ` : ``}${getStringForTime(durationMinutes)}M`
  );
};

const createEventTemplate = (event) => {
  const eventIcon = `img/icons/${EVENT_ICONS[event.type]}`.toLowerCase();
  const eventTitle = getEventTitle(event) + ` ${event.town}`;
  const startTime = `${getStringForTime(event.startDate.getHours())}:${getStringForTime(event.startDate.getMinutes())}`;
  const endTime = `${getStringForTime(event.endDate.getHours())}:${getStringForTime(event.endDate.getMinutes())}`;

  const durationMarkup = getDurationMarkup(event);
  const offersMarkup = event.services.map((offer) => getOfferMarkup(offer)).join(`\n`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${eventIcon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
          </p>
          <p class="event__duration">${durationMarkup}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventComponent extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }
}
