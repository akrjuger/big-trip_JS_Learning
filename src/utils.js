// export const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

// export const getMonthShortName = (date) => {
//   return date.toString().slice(4, 7).toUpperCase();
// };

// export const sortEventsByDate = (events) => {
//   return events.sort((a, b) => a.startDate - b.startDate);
// };

// export const createElement = (template) => {
//   const element = document.createElement(`div`);
//   element.innerHTML = template;
//
//   return element.firstChild;
// };
//
// export const renderElement = (container, template, place) => {
//   switch (place) {
//     case `afterbegin`:
//       container.prepend(template);
//       break;
//     case `beforeend`:
//       container.append(template);
//       break;
//     default: return;
//   }
// };
