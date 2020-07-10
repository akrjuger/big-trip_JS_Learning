export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const renderElement = (container, template, place) => {
  switch (place) {
    case `afterbegin`:
      container.prepend(template);
      break;
    case `beforeend`:
      container.append(template);
      break;
    default: return;
  }
};

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
