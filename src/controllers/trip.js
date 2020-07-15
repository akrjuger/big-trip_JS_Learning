import NoEventsComponent from '../components/no-events.js';
import SortingComponent, {SortType} from '../components/sort.js';
import DaysListComponent from '../components/days-list.js';
import DayComponent from '../components/day.js';
import EventController from './event.js';
import {renderElement, remove} from '../utils/render.js';

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
  constructor(container, eventsModel) {
    this._container = container;
    // this._events = [];
    this._eventsModel = eventsModel;

    this._eventsContollers = [];

    this._sortingComponent = new SortingComponent();
    this._daysListComponent = new DaysListComponent();
    this._noEventsComponent = new NoEventsComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const events = this._eventsModel.getEvents();
    const isEvents = events.length !== 0;
    if (!isEvents) {
      renderElement(this._container, this._noEventsComponent, `beforeend`);
      return;
    }

    renderElement(this._container, this._sortingComponent, `beforeend`);
    renderElement(this._container, this._daysListComponent, `beforeend`);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._renderEventWithDates();
  }

  _renderEventWithDates() {
    const events = this._eventsModel.getEvents();
    const datesList = Array.from(new Set(events.map((event) => event.startDate.toDateString())));
    this._sortingComponent.showDayTitle();
    datesList.forEach((dateString, index) => {
      const dayElement = new DayComponent(new Date(dateString), index + 1);
      // ***********
      renderElement(this._daysListComponent.getElement(), dayElement, `beforeend`);
      const eventsDayElement = dayElement.getElement().querySelector(`.trip-events__list`);
      // ****************
      for (const event of events) {
        if (event.startDate.toDateString() === dateString) {
          const eventController = new EventController(eventsDayElement, this._onDataChange, this._onViewChange);
          eventController.render(event);
          this._eventsContollers.push(eventController);
        }
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._daysListComponent.clearList();
    if (sortType === SortType.DEFAULT) {
      this._renderEventWithDates();
      return;
    }
    const sortedEvents = getSortedEvents(this._eventsModel.getEvents(), sortType);

    this._sortingComponent.hideDayTitle();
    const dayElement = new DayComponent();
    renderElement(this._daysListComponent.getElement(), dayElement, `beforeend`);
    const eventsDayElement = dayElement.getElement().querySelector(`.trip-events__list`);
    for (const event of sortedEvents) {
      const eventController = new EventController(eventsDayElement, this._onDataChange, this._onViewChange);
      eventController.render(event);
      this._eventsContollers.push(eventController);
    }
  }

  _onViewChange() {
    this._eventsContollers.forEach((eventController) => eventController.setDefaultView());
  }

  _onDataChange(eventController, oldEvent, newEvent) {
    this._eventsModel.updateEvent(oldEvent.id, newEvent);

    eventController.render(newEvent);
  }

  _updateEvents() {
    this._eventsContollers.forEach((eventController) => eventController.destroy());
    this._eventsContollers = [];
    remove(this._sortingComponent);
    remove(this._daysListComponent);
    remove(this._noEventsComponent);
    this.render();
  }

  _onFilterChange() {
    this._updateEvents();
  }
}
