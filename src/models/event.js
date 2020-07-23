export default class EventModel {
  constructor(data) {
    this._event = {
      id: data.id,
      type: data.type[0].toUpperCase() + data.type.slice(1),
      startDate: new Date(data.date_from),
      endDate: new Date(data.date_to),
      price: data.base_price,
      // town: data.destination.name,
      // photos: data.destination.pictures.map((picture) => picture.src),
      // description: data.destination.description,
      destination: data.destination,
      offers: data.offers,
      isFavorite: data.is_favorite
    };

    // this.getEvent = this.getEvent.bind(this);
  }

  toJson() {
    return {
      'id': this._event.id,
      'type': this._event.type.toLowerCase,
      'date_from': this._event.startDate.toString(),
      'date_to': this._event.endDate.toString(),
      'base_price': this._event.price,
    };
  }

  static parserEvent() {
    return new EventModel();
  }

  // parseDestination(destination) {
  //   return {
  //
  //   };
  // }

  getEvent() {
    return this._event;
  }
}
