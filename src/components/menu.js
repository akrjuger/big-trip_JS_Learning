import AbstractSmartComponent from './abstract-smart-component.js';

export const MenuNames = [
  `Table`,
  `Stats`
];

const createMenuMarkup = (menuName, isActive) => {
  return (
    `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${menuName}</a>`
  );
};

const createMenuTemplate = (activeMenu) => {
  const menuMarkups = MenuNames.map((menuName) => createMenuMarkup(menuName, menuName === activeMenu)).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuMarkups}
    </nav>`
  );
};

export default class MenuComponent extends AbstractSmartComponent {
  constructor() {
    super();
    this._activeMenu = MenuNames[0];

    this._changeMenuHandler = null;
  }

  getTemplate() {
    return createMenuTemplate(this._activeMenu);
  }

  recoveryListeners() {
    this.setChangeMenuClickHandler(this._changeMenuHandler);
  }

  setChangeMenuClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.nodeName !== `A`) {
        return;
      }
      this._activeMenu = evt.target.innerText;
      this.rerender();
      handler(this._activeMenu);
    });
    this._changeMenuHandler = handler;
  }
}
