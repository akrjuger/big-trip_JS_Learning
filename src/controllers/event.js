import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {renderElement, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

export default class EventController {
  constructor(container, onViewChange) {
    this._container = container;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onViewChange = onViewChange;
    this._escHandler = this._escHandler.bind(this);
    // this._replaceEditComponent = this._replaceEditComponent.bind(this);

  }

  render(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);
    renderElement(this._container, this._eventComponent, `beforeend`);

    //  logic for replacing one component on another

    this._eventComponent.setEditHandler(() => {
      this._onViewChange();
      this._mode = Mode.EDIT;
      replace(this._eventEditComponent, this._eventComponent);
      document.addEventListener(`keydown`, this._escHandler);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditComponent();
    });
  }

  _escHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditComponent();
    }
  }

  _replaceEditComponent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escHandler);
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditComponent();
    }
  }
}
