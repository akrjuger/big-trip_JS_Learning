import EventModel from './models/event.js';

const Methods = {
  GET: `GET`,
  PUSH: `PUSH`,
  DELETE: `DELETE`
};

export default class API {
  constructor(endPoint, authToken) {
    this._endPoint = endPoint;
    this._authToken = authToken;
  }

  getEvents() {
    return this._load(`points`)
    .then((datas) => datas.map((data) => new EventModel(data).getEvent()));
  }

  getDestinations() {
    return this._load(`destinations`);
  }

  getOffers() {
    return this._load(`offers`);
  }

  _load(url, method = Methods.GET) {
    return fetch(this._endPoint + url, {
      method,
      headers: {
        "Authorization": this._authToken
      }
    }).then((response) => response.json());
  }

}
