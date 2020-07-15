export default class EventsModel {
  constructor() {
    this._events = null;
  }

  getEvents() {
    return this._events;
  }

  getEvent(id) {
    return this._events[this._findIndexById(id)];
  }

  setEvents(events) {
    this._events = events;
  }

  updateEvent(id, newEvent) {
    this._events[this._findIndexById(id)] = newEvent;
  }

  _findIndexById(id) {
    return this._events.findIndex((event) => event.id === id);
  }
}
