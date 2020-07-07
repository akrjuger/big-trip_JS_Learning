import {EVENT_TYPES} from '../const.js';

const EVENT_ICONS = {
  'Check': `check-in.png`,
  'Sightseeing': `sightseeing.png`,
  'Restaurant': `restaurant.png`,
  'Taxi': `taxi.png`,
  'Bus': `bus.png`,
  'Train': `train.png`,
  'Ship': `ship.png`,
  'Transport': `transport.png`,
  'Drive': `drive.png`,
  'Flight': `flight.png`
};

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

export const createEventTemplate = (event) => {
  const eventIcon = `img/icons/${EVENT_ICONS[event.type]}`.toLowerCase();
  const eventTitle = `${event.type} ${EVENT_TYPES.place.indexOf(event.type) === -1 ? `to` : `in`} ${event.town}`;
  const startTime = `${getStringForTime(event.startDate.getHours())}:${getStringForTime(event.startDate.getMinutes())}`;
  const endTime = `${getStringForTime(event.endDate.getHours())}:${getStringForTime(event.endDate.getMinutes())}`;
  const durationTime = (event.endDate.getTime() - event.startDate.getTime());
  const durationHours = Math.floor((durationTime / 1000 / 60 / 60) % 60);
  const durationMinutes = Math.floor((durationTime / 1000 / 60) % 60);
  const duration = `${durationHours > 0 ? `${getStringForTime(durationHours)}H ` : ``}${getStringForTime(durationMinutes)}M`;
  const offersMarkup = event.services.map((offer) => getOfferMarkup(offer)).join(`\n`);
  // debugger;
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
          <p class="event__duration">${duration}</p>
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
