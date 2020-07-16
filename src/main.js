import TripInfoController from './controllers/trip-info.js';
import MenuComponent from './components/menu.js';
import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip.js';
import EventsModel from './models/events.js';
import {renderElement} from './utils/render.js';
import {sortEventsByDate} from './utils/events.js';
import {generateEvents} from './mockup/event.js';


// event type should be a object not a String
const EVENTS_COUNT = 10;
const events = sortEventsByDate(generateEvents(EVENTS_COUNT));

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripInfoHeader = document.querySelector(`.trip-main`);
const controlsElement = tripInfoHeader.querySelector(`.trip-main__trip-controls`);
const boardElement = document.querySelector(`.trip-events`);

// renderElement(tripInfoHeader, new TripInfoComponent(eventsModel), `afterbegin`);
const tripInfoController = new TripInfoController(tripInfoHeader, eventsModel);
tripInfoController.render();

renderElement(controlsElement, new MenuComponent(), `afterbegin`);

const filtersController = new FiltersController(controlsElement, eventsModel);
filtersController.render();

const tripController = new TripController(boardElement, eventsModel);
tripController.render();
