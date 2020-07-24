import EventModel from './models/event.js';

const Methods = {
  GET: `GET`,
  POST: `POST`,
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

  addEvent(event) {
    return this._load(`points`, Methods.POST, JSON.stringify(EventModel.toRAW(event)));
  }

  getDestinations() {
    return this._load(`destinations`);
  }

  getOffers() {
    return this._load(`offers`);
  }

  _load(url, method = Methods.GET, body) {
    return fetch(this._endPoint + url, {
      method,
      headers: {
        "Authorization": this._authToken,
        'Content-Type': `application/json`
      },
      body
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.url + ` : ` + response.status + response.statusText);
      }
      return response.json();
    });
  }

}
