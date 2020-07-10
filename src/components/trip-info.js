import {getMonthShortName} from '../utils/common.js';

const MAX_TOWNS_NAMES = 3;

const getTripTownsMarkup = (events) => {
  const towns = events
    .map((event) => event.town)
    .filter((event, i, array) => event !== array[i - 1]); // delete towns if they are neighrbars

  let tripMarkup = ``;
  if (towns.length > MAX_TOWNS_NAMES) {
    tripMarkup = `${towns[0]} &mdash; ...  &mdash; ${towns[towns.length - 1]}`;
  } else {
    tripMarkup = towns.map((town) => town).join(` &mdash; `);
  }

  return tripMarkup;
};

const getTripDatesMarkup = (events) => {
  return (
    `${events[0].startDate.getDate()}&nbsp;${getMonthShortName(events[0].startDate)}&nbsp;&mdash;&nbsp;${events[events.length - 1].endDate.getDate()} ${getMonthShortName(events[events.length - 1].endDate)}`
  );
};

const getTotalPrice = (events) => {
  let totalcost = 0;
  events.map((it) => {
    totalcost += it.price;
    it.services.map((service) => {
      totalcost += service.price;
    });
  });
  return totalcost;
};


export const createTripInfoTemplate = (events = []) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripTownsMarkup(events)}</h1>

        <p class="trip-info__dates">${getTripDatesMarkup(events)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(events)}</span>
      </p>
    </section>`
  );
};
