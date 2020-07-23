import {getEventsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';
import {sortEventsByDate} from '../utils/events.js';

export default class EventsModel {
  constructor() {
    this._events = null;
    this._destinations = null;
    this._offers = null;
    this._currentFilter = FilterType.EVERYTHING;

    this._filterChangeHandler = null;
    this._dataChangeHandler = () => ``;

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
    this._dataChangeHandler();
  }

  updateEvent(id, newEvent) {
    this._events[this._findIndexById(id)] = newEvent;
    this._dataChangeHandler();
  }

  deleteEvent(id) {
    this._events = this._events.filter((event) => !(id === event.id));
    this._dataChangeHandler();
  }

  addEvent(event) {
    event = Object.assign({}, event, {id: this._events.length});
    this._events.push(event);
    this._events = sortEventsByDate(this._events);
    this._dataChangeHandler();
  }

  setFilter(filterType) {
    this._currentFilter = filterType;
    this._filterChangeHandler();
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler = handler;
  }

  setDestinatioins(destinations) {
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffers() {
    return this._offers;
  }

  _findIndexById(id) {
    return this._events.findIndex((event) => event.id === id);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
  }
}
