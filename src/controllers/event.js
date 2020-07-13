import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {renderElement, replace} from '../utils/render.js';

export default class EventController {
  constructor(container) {
    this._container = container;
    this._eventComponent = null;
    this._eventEditComponent = null;
  }

  render(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);
    renderElement(this._container, this._eventComponent, `beforeend`);

    //  logic for replacing one component on another
    const replaceEditComponent = () => {
      replace(this._eventComponent, this._eventEditComponent);
      document.removeEventListener(`keydown`, escHandler);
    };

    const escHandler = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceEditComponent();
      }
    };

    this._eventComponent.setEditHandler(() => {
      replace(this._eventEditComponent, this._eventComponent);
      document.addEventListener(`keydown`, escHandler);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditComponent();
    });
  }
}
