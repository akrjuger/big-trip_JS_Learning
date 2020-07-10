const createMenuMarkup = (menuName, isActive) => {
  return (
    `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${menuName}</a>`
  );
};

export const createMenuTemplate = (menuNames) => {
  const menuMarkups = menuNames.map((menuName, it) => createMenuMarkup(menuName, it === 0)).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuMarkups}
    </nav>`
  );
};
