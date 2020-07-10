import {EVENT_TYPES} from '../const.js';

export const sortEventsByDate = (events) => {
  return events.sort((a, b) => a.startDate - b.startDate);
};

export const getEventTitle = (event) => {
  return (
    `${event.type} ${EVENT_TYPES.place.indexOf(event.type) === -1 ? `to` : `in`}`
  );
};
