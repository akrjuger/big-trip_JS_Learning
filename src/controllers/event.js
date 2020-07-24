import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {renderElement, replace, remove} from '../utils/render.js';
import {EVENT_TYPES} from '../const.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

const DEFAULT_EVENT = {
  type: EVENT_TYPES.place[0],
  destination: {
    name: ``,
    pictures: [],
    description: ``
  },
  startDate: new Date(),
  endDate: new Date(),
  price: 0,
  offers: [],
  isFavorite: false
};

export default class EventController {
  constructor(container, onDataChange, onViewChange, eventsModel) {
    this._container = container;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._mode = Mode.DEFAULT;

    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;

    this._escHandler = this._escHandler.bind(this);
    // this._replaceEditComponent = this._replaceEditComponent.bind(this);

    this._eventsModel = eventsModel;
  }

  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    if (!event) {
      this._mode = Mode.ADD;
      this._eventComponent = new EventComponent(DEFAULT_EVENT);
      this._eventEditComponent = new EventEditComponent(DEFAULT_EVENT, Mode.ADD, this._eventsModel.getDestinations(), this._eventsModel.getOffers());
    } else {
      this._eventComponent = new EventComponent(event);
      this._eventEditComponent = new EventEditComponent(event, Mode.EDIT, this._eventsModel.getDestinations(), this._eventsModel.getOffers());
    }
    if (oldEventComponent && oldEventEditComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else if (!event) {
      renderElement(this._container, this._eventEditComponent, `afterbegin`);
    } else {
      renderElement(this._container, this._eventComponent, `beforeend`);
    }


    //  logic for replacing one component on another
    this._eventComponent.setEditHandler(() => {
      this._onViewChange();
      this._mode = Mode.EDIT;
      replace(this._eventEditComponent, this._eventComponent);
      document.addEventListener(`keydown`, this._escHandler);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      if (this._mode === Mode.ADD) {
        this._onDataChange(this, null, this._eventEditComponent.getData());
        return;
      }
      this._onDataChange(this, event, this._eventEditComponent.getData());
      this._replaceEditComponent();
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      const newEvent = Object.assign({}, event, {isFavorite: !event.isFavorite});
      this._onDataChange(this, event, newEvent);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      if (this._mode === Mode.EDIT) {
        this._onDataChange(this, event, null);
      } else {
        this._onDataChange(this, null, null);
      }
    });

    this._eventEditComponent.setCloseButtonClickHandler(() => {
      this._eventEditComponent.reset();
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
      return;
    }
    if (this._mode === Mode.ADD) {
      this.destroy();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escHandler);
  }
}
