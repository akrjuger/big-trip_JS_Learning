import TripInfoController from './controllers/trip-info.js';
import MenuComponent from './components/menu.js';
import StatsComponent from './components/stats.js';
import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip.js';
import EventsModel from './models/events.js';
import API from './api.js';
import {renderElement} from './utils/render.js';
// import {sortEventsByDate} from './utils/events.js';
// import {generateEvents} from './mockup/event.js';

const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;
// const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;
const AUTH_TOKEN = `Basic nkfdkjndfnjkdfbiuh=`;

const eventsModel = new EventsModel();
const api = new API(END_POINT, AUTH_TOKEN);

// event type should be a object not a String
// const EVENTS_COUNT = 10;
// const events = sortEventsByDate(generateEvents(EVENTS_COUNT));


// const eventsModel = new EventsModel();
// eventsModel.setEvents(events);

const tripInfoHeader = document.querySelector(`.trip-main`);
const controlsElement = tripInfoHeader.querySelector(`.trip-main__trip-controls`);
const boardElement = document.querySelector(`.trip-events`);
const statsContainer = document.querySelector(`.page-body__page-main > .page-body__container`);

// renderElement(tripInfoHeader, new TripInfoComponent(eventsModel), `afterbegin`);


const menuComponent = new MenuComponent();
renderElement(controlsElement, menuComponent, `afterbegin`);

const filtersController = new FiltersController(controlsElement, eventsModel);
// filtersController.render();

const tripController = new TripController(boardElement, eventsModel);
// tripController.render();
// tripController.hide();

const statsComponent = new StatsComponent();
renderElement(statsContainer, statsComponent, `beforeend`);
// statsComponent.hide();
// statsComponent.renderAllCharts(eventsModel.getEventsAll());

const tripInfoController = new TripInfoController(tripInfoHeader, eventsModel, statsComponent);
// tripInfoController.render();

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


Promise.all([api.getDestinations(), api.getOffers(), api.getEvents()])
  .then((values) => {
    eventsModel.setDestinatioins(values[0]);
    eventsModel.setOffers(values[1]);
    eventsModel.setEvents(values[2]);
    filtersController.render();
    tripController.render();
    tripInfoController.render();
    statsComponent.renderAllCharts(eventsModel.getEventsAll());
    statsComponent.hide();
  });
// api.getDestinations()
//   .then((destinations) => eventsModel.setDestinatioins(destinations));
// api.getOffers();

// api.getEvents()
//   .then((events) => {
//     eventsModel.setEvents(events);
//     filtersController.render();
//     tripController.render();
//     tripInfoController.render();
//     statsComponent.renderAllCharts(eventsModel.getEventsAll());
//     statsComponent.hide();
//   });
