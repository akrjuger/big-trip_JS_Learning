import {FilterType} from '../const.js';

export const getEventsByFilter = (events, filterType) => {
  let filteredEvents = [];
  switch (filterType) {
    case FilterType.EVERYTHING:
      filteredEvents = events;
      break;
    case FilterType.PAST:
      filteredEvents = events.filter((event) => event.startDate.getTime() < Date.now());
      break;
    case FilterType.FUTURE:
      filteredEvents = events.filter((event) => event.startDate.getTime() > Date.now());
      break;
  }
  return filteredEvents;
};
