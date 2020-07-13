import TripInfoComponent from './components/trip-info.js';
import MenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import TripController from './controllers/trip.js';
import {renderElement} from './utils/render.js';
import {sortEventsByDate} from './utils/events.js';
import {generateEvents} from './mockup/event.js';
import {generateFilters} from './mockup/filters.js';


// event type should be a object not a String
const EVENTS_COUNT = 10;
const events = sortEventsByDate(generateEvents(EVENTS_COUNT));

const tripInfoHeader = document.querySelector(`.trip-main`);
const controlsElement = tripInfoHeader.querySelector(`.trip-main__trip-controls`);
const boardElement = document.querySelector(`.trip-events`);

renderElement(tripInfoHeader, new TripInfoComponent(events), `afterbegin`);
renderElement(controlsElement, new MenuComponent(), `afterbegin`);
const filters = generateFilters();
renderElement(controlsElement, new FiltersComponent(filters), `beforeend`);

const tripController = new TripController(boardElement);
tripController.render(events);
