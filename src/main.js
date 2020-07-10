import {createTripInfoTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createSortingTemplate} from './components/sort.js';
import {createDaysListTemplate} from './components/days-list.js';
import {createDayTemplate} from './components/day.js';
import {createEventTemplate} from './components/event.js';
import {createEventEditTemplate} from './components/event-edit.js';
import {render, createElement, renderElement} from './utils/render.js';
import {sortEventsByDate} from './utils/events.js';
import {generateEvent, generateEvents} from './mockup/event.js';
import {generateFilters} from './mockup/filters.js';
import {menuNames} from './mockup/menu.js';

// event type should be a object not a String

const EVENTS_COUNT = 30;
const events = sortEventsByDate(generateEvents(EVENTS_COUNT));

// this should be not here create dataList from events it should be in controller or model
// const datesList = [];
const datesList = Array.from(new Set(events.map((event) => event.startDate.toDateString())));

const tripInfoHeader = document.querySelector(`.trip-main`);
const controlsElement = tripInfoHeader.querySelector(`.trip-main__trip-controls`);
const boardElement = document.querySelector(`.trip-events`);

render(tripInfoHeader, createTripInfoTemplate(events), `afterbegin`);
render(controlsElement, createMenuTemplate(menuNames), `afterbegin`);
const filters = generateFilters();
render(controlsElement, createFiltersTemplate(filters), `beforeend`);
render(boardElement, createSortingTemplate(), `beforeend`);
render(boardElement, createDaysListTemplate(), `beforeend`);

const daysListElement = boardElement.querySelector(`.trip-days`);

datesList.forEach((dateString, index) => {
  const date = new Date(dateString);
  const dayElement = createElement(createDayTemplate(date, index + 1));
  renderElement(daysListElement, dayElement, `beforeend`);
  const eventsDayElement = dayElement.querySelector(`.trip-events__list`);
  events.forEach((event) => {
    if (event.startDate.toDateString() === dateString) {
      render(eventsDayElement, createEventTemplate(event), `beforeend`);
    }
  });
});

// render(daysListElement, createDayTemplate(), `beforeend`);
// const dayElement = daysListElement.querySelector(`.trip-events__list`);
// events.forEach((event) => render(dayElement, createEventTemplate(event), `beforeend`));

render(daysListElement, createEventEditTemplate(generateEvent()), `afterbegin`);
