import NoEventsComponent from '../components/no-events.js';
import SortingComponent, {SortType} from '../components/sort.js';
import DaysListComponent from '../components/days-list.js';
import DayComponent from '../components/day.js';
import EventController from './event.js';
import {renderElement} from '../utils/render.js';

const getSortedEvents = (events, sortType) => {
  let sortedEvents = events.slice();
  switch (sortType) {
    case (SortType.TIME):
      sortedEvents = sortedEvents.sort((a, b) => {
        const aDurationTime = new Date(a.endDate - a.startDate);
        const bDurationTime = new Date(b.endDate - b.startDate);
        return aDurationTime - bDurationTime;
      });
      break;
    case (SortType.PRICE):
      sortedEvents = sortedEvents.sort((a, b) => a.price - b.price);
      break;
  }
  return sortedEvents;
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = null;

    this._sortingComponent = new SortingComponent();
    this._daysListComponent = new DaysListComponent();
    this._noEventsComponent = new NoEventsComponent();
  }

  render(events) {
    this._events = events;
    const isEvents = this._events.length !== 0;
    if (!isEvents) {
      renderElement(this._container, this._noEventsComponent, `beforeend`);
      return;
    }

    renderElement(this._container, this._sortingComponent, `beforeend`);
    renderElement(this._container, this._daysListComponent, `beforeend`);

    this._renderEventWithDates();

    this._sortingComponent.setSortTypeChangeHandler((sortType) =>{
      this._daysListComponent.clearList();

      if (sortType === SortType.DEFAULT) {
        this._renderEventWithDates();
        return;
      }
      const sortedEvents = getSortedEvents(this._events, sortType);

      this._sortingComponent.hideDayTitle();
      const dayElement = new DayComponent();
      renderElement(this._daysListComponent.getElement(), dayElement, `beforeend`);
      const eventsDayElement = dayElement.getElement().querySelector(`.trip-events__list`);
      for (const event of sortedEvents) {
        const eventController = new EventController(eventsDayElement);
        eventController.render(event);
      }
    });
  }

  _renderEventWithDates() {
    const datesList = Array.from(new Set(this._events.map((event) => event.startDate.toDateString())));
    this._sortingComponent.showDayTitle();
    datesList.forEach((dateString, index) => {
      const dayElement = new DayComponent(new Date(dateString), index + 1);
      // ***********
      renderElement(this._daysListComponent.getElement(), dayElement, `beforeend`);
      const eventsDayElement = dayElement.getElement().querySelector(`.trip-events__list`);
      // ****************
      for (const event of this._events) {
        if (event.startDate.toDateString() === dateString) {
          const eventController = new EventController(eventsDayElement);
          eventController.render(event);
        }
      }
    });
  }
}
