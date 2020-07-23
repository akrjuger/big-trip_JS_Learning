import EventModel from './models/event.js';

export default class API {
  constructor(endPoint, authToken) {
    this._endPoint = endPoint;
    this._authToken = authToken;

    this._events = [];
    this._destionations = [];
    this._offers = [];
  }

  getEvents() {
    return fetch(this._endPoint + `points`, {
      method: `GET`,
      headers: {
        "Authorization": this._authToken
      }
    }).then((response) => {
      return response.json();
    })
    .then((datas) => {
      datas.forEach((data) => {
        // console.log(data);
        this._events.push(new EventModel(data).getEvent());
      });
      return this._events;
      // console.log(this._eventModels.forEach((eventModel) => eventModel.getEvent()));
    });
  }

  getDestinations() {
    return fetch(this._endPoint + `destinations`, {
      method: `GET`,
      headers: {
        "Authorization": this._authToken
      }
    }).then((response) => {
      return response.json();
    })
    .then((datas) => {
      // console.log(datas);
      return (datas);
      // console.log(this._eventModels.forEach((eventModel) => eventModel.getEvent()));
    });
  }

  getOffers() {
    return fetch(this._endPoint + `offers`, {
      method: `GET`,
      headers: {
        "Authorization": this._authToken
      }
    }).then((response) => {
      return response.json();
    })
    .then((datas) => {
      // console.log(datas);
      // console.log(this._eventModels.forEach((eventModel) => eventModel.getEvent()));
    });
  }

}
