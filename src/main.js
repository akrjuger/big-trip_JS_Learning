import {createTripInfoTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createSortingTemplate} from './components/sort.js';
import {createDaysListTemplate} from './components/days-list.js';
import {createDayTemplate} from './components/day.js';
import {createEventTemplate} from './components/event.js';
import {createEventEditTemplate} from './components/event-edit.js';
import {render} from './utils.js';
import {generateEvent, generateEvents} from './mockup/event.js';

const tripInfoHeader = document.querySelector(`.trip-main`);
const controlsElement = tripInfoHeader.querySelector(`.trip-main__trip-controls`);
const boardElement = document.querySelector(`.trip-events`);


render(tripInfoHeader, createTripInfoTemplate(), `afterbegin`);
render(controlsElement, createMenuTemplate(), `afterbegin`);
render(controlsElement, createFiltersTemplate(), `beforeend`);
render(boardElement, createSortingTemplate(), `beforeend`);
render(boardElement, createDaysListTemplate(), `beforeend`);

const daysListElement = boardElement.querySelector(`.trip-days`);

render(daysListElement, createDayTemplate(), `beforeend`);
const dayElement = daysListElement.querySelector(`.trip-events__list`);
for (let j = 0; j < 3; j++) {
  const event = generateEvent();
  render(dayElement, createEventTemplate(event), `beforeend`);
}

render(daysListElement, createEventEditTemplate(), `afterbegin`);
