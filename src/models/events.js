import {getEventsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';
import {sortEventsByDate} from '../utils/events.js';

export default class EventsModel {
  constructor() {
    this._events = null;
    this._currentFilter = FilterType.EVERYTHING;
    this._filterChangeHandler = null;

    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

  }

  getEventsAll() {
    return this._events;
  }

  getEvent(id) {
    return this._events[this._findIndexById(id)];
  }

  getEvents() {
    return getEventsByFilter(this._events, this._currentFilter);
  }

  setEvents(events) {
    this._events = events;
    this._events = sortEventsByDate(this._events);
  }

  updateEvent(id, newEvent) {
    this._events[this._findIndexById(id)] = newEvent;
  }

  deleteEvent(id) {
    this._events = this._events.filter((event) => !(id === event.id));
  }

  addEvent(event) {
    event = Object.assign({}, event, {id: this._events.length});
    this._events.push(event);
    this._events = sortEventsByDate(this._events);
  }

  setFilter(filterType) {
    this._currentFilter = filterType;
    this._filterChangeHandler();
  }

  _findIndexById(id) {
    return this._events.findIndex((event) => event.id === id);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
  }
}
