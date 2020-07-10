import AbstractComponent from './abstract-component.js';

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DaysListComponent extends AbstractComponent {
  getTemplate() {
    return createDaysListTemplate();
  }
}
