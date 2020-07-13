import AbstractComponent from './abstract-component.js';
import {getMonthShortName} from '../utils/common.js';

const createDayTemplate = (date = null, dayCounter = ``) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
         <span class="day__counter">${dayCounter}</span>
         <time class="day__date" datetime="${date ? date.toLocaleDateString().split(`.`).join(`-`) : ``}">${date ? (getMonthShortName(date) + ` ` + date.getDate()) : ``}</time>
      </div>
        <ul class="trip-events__list">
        </ul>
     </li>`
  );
};

export default class DayComponent extends AbstractComponent {
  constructor(date, dayCounter) {
    super();
    this._date = date;
    this._dayCounter = dayCounter;
  }
  getTemplate() {
    return createDayTemplate(this._date, this._dayCounter);
  }
}
