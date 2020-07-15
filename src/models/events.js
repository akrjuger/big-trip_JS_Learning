import {getEventsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class EventsModel {
  constructor() {
    this._events = null;
    this._currentFilter = FilterType.EVERYTHING;
    this._filterChangeHandler = null;

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
  }

  updateEvent(id, newEvent) {
    this._events[this._findIndexById(id)] = newEvent;
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
