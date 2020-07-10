import {getMonthShortName} from '../utils/common.js';

export const createDayTemplate = (date, dayCounter = 1) => {
  // only for development
  // date = new Date();
  // console.log(date);

  const day = date.getDate();
  // const month = date.getMonth();
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
         <span class="day__counter">${dayCounter}</span>
         <time class="day__date" datetime="2019-03-18">${getMonthShortName(date)} ${day}</time>
      </div>
        <ul class="trip-events__list">
        </ul>
     </li>`
  );
};
