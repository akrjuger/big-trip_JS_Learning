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

  static toRAW(event) {
    // const pictures = event.destination.pictures.map((picture) => {'src'})
    return {
      'id': event.id.toString(),
      'type': event.type.toLowerCase(),
      'date_from': event.startDate.toISOString(),
      'date_to': event.endDate.toISOString(),
      'base_price': event.price,
      'destination': {
        'name': event.destination.name,
        'pictures': event.destination.pictures,
        'description': event.destination.description
      },
      'offers': event.offers,
      'is_favorite': event.isFavorite
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
