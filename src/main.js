import TripInfoComponent from './components/trip-info.js';
import MenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import NoEventsComponent from './components/no-events.js';
import SortingComponent from './components/sort.js';
import DaysListComponent from './components/days-list.js';
import DayComponent from './components/day.js';
import EventComponent from './components/event.js';
import EventEditComponent from './components/event-edit.js';
import {renderElement, replace} from './utils/render.js';
import {sortEventsByDate} from './utils/events.js';
import {generateEvents} from './mockup/event.js';
import {generateFilters} from './mockup/filters.js';


// event type should be a object not a String
const EVENTS_COUNT = 0;
const events = sortEventsByDate(generateEvents(EVENTS_COUNT));

// this should be not here create dataList from events it should be in controller or model
// const datesList = [];
const datesList = Array.from(new Set(events.map((event) => event.startDate.toDateString())));

const tripInfoHeader = document.querySelector(`.trip-main`);
const controlsElement = tripInfoHeader.querySelector(`.trip-main__trip-controls`);
const boardElement = document.querySelector(`.trip-events`);

renderElement(tripInfoHeader, new TripInfoComponent(events).getElement(), `afterbegin`);
renderElement(controlsElement, new MenuComponent().getElement(), `afterbegin`);
const filters = generateFilters();
renderElement(controlsElement, new FiltersComponent(filters).getElement(), `beforeend`);

const renderBoard = () => {
  const isEvents = events.length !== 0;
  if (!isEvents) {
    renderElement(boardElement, new NoEventsComponent().getElement(), `beforeend`);
    return;
  }


  renderElement(boardElement, new SortingComponent().getElement(), `beforeend`);
  renderElement(boardElement, new DaysListComponent().getElement(), `beforeend`);

  const daysListElement = boardElement.querySelector(`.trip-days`);

  datesList.forEach((dateString, index) => {
    const date = new Date(dateString);
    const dayElement = new DayComponent(date, index + 1).getElement();
    // const dayElement = createElement(createDayTemplate(date, index + 1));
    renderElement(daysListElement, dayElement, `beforeend`);
    const eventsDayElement = dayElement.querySelector(`.trip-events__list`);
    for (const event of events) {
      if (event.startDate.toDateString() === dateString) {
        const eventComponent = new EventComponent(event);
        const eventEditComponent = new EventEditComponent(event);
        renderElement(eventsDayElement, eventComponent.getElement(), `beforeend`);

        //  logic for replacing one component on another
        const replaceEditComponent = () => {
          replace(eventComponent, eventEditComponent);
          document.removeEventListener(`keydown`, escHandler);
        };

        const escHandler = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
          if (isEscKey) {
            replaceEditComponent();
          }
        };
        eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
          replace(eventEditComponent, eventComponent);
          document.addEventListener(`keydown`, escHandler);
        });
        eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
          evt.preventDefault();
          replaceEditComponent();
        });
      }
    }
  });
};

renderBoard();
