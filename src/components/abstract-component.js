import {createElement} from '../utils/render.js';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`This is AbstractComponent, you can't create instance of it`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`AbstractComponent, method is not implemented -- getTemplate`);
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
