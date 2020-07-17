import TripInfoController from './controllers/trip-info.js';
import MenuComponent from './components/menu.js';
import StatsComponent from './components/stats.js';
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
const statsContainer = document.querySelector(`.page-body__page-main > .page-body__container`);

// renderElement(tripInfoHeader, new TripInfoComponent(eventsModel), `afterbegin`);
const tripInfoController = new TripInfoController(tripInfoHeader, eventsModel);
tripInfoController.render();

const menuComponent = new MenuComponent();
renderElement(controlsElement, menuComponent, `afterbegin`);

const filtersController = new FiltersController(controlsElement, eventsModel);
filtersController.render();

const tripController = new TripController(boardElement, eventsModel);
tripController.render();

const statsComponent = new StatsComponent();
renderElement(statsContainer, statsComponent, `beforeend`);
statsComponent.hide();

menuComponent.setChangeMenuClickHandler((activeMenu) => {
  if (activeMenu === `Table`) {
    tripController.show();
    statsComponent.hide();
    return;
  }
  if (activeMenu === `Stats`) {
    tripController.hide();
    statsComponent.show();
    return;
  }
});
