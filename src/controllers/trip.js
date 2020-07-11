import NoEventsComponent from '../components/no-events.js';
import SortingComponent from '../components/sort.js';
import DaysListComponent from '../components/days-list.js';
import DayComponent from '../components/day.js';
import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {renderElement, replace} from '../utils/render.js';

export default class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
  }

  render() {
    const datesList = Array.from(new Set(this._events.map((event) => event.startDate.toDateString())));
    const isEvents = this._events.length !== 0;
    if (!isEvents) {
      renderElement(this._container, new NoEventsComponent(), `beforeend`);
      return;
    }


    renderElement(this._container, new SortingComponent(), `beforeend`);
    renderElement(this._container, new DaysListComponent(), `beforeend`);

    const daysListElement = this._container.querySelector(`.trip-days`);

    datesList.forEach((dateString, index) => {
      const date = new Date(dateString);
      const dayElement = new DayComponent(date, index + 1);

      renderElement(daysListElement, dayElement, `beforeend`);
      const eventsDayElement = dayElement.getElement().querySelector(`.trip-events__list`);
      for (const event of this._events) {
        if (event.startDate.toDateString() === dateString) {
          const eventComponent = new EventComponent(event);
          const eventEditComponent = new EventEditComponent(event);
          renderElement(eventsDayElement, eventComponent, `beforeend`);

          //  logic for replacing one component on another
          const replaceEditComponent = () => {
            replace(eventComponent, eventEditComponent);
            document.removeEventListener(`keydown`, escHandler);
          };

          const escHandler = (evt) => {
            const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
            if (isEscKey) {
              replaceEditComponent();
            }
          };

          eventComponent.setEditHandler(() => {
            replace(eventEditComponent, eventComponent);
            document.addEventListener(`keydown`, escHandler);
          });

          eventEditComponent.setSubmitHandler((evt) => {
            evt.preventDefault();
            replaceEditComponent();
          });
        }
      }
    });
  }
}
