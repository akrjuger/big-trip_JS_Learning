const EVENT_TYPES = [
  `Check`,
  `Sightseeing`,
  `Restaurant`,
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`
];

const TOWNS = [
  `Moscow`,
  `Saint-Petersburg`,
  `Bratislava`,
  `Wien`,
  `Amsterdam`
];

const DESCRIPTION_ITEMS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const SERVICES = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 30
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5
  }
];

const MIN_DESCRTIPTION_QUANTITY = 1;
const MAX_DESCRTIPTION_QUANTITY = 3;
const MIN_SERVICES_QUANTITY = 0;
const MAX_SERVICES_QUANTITY = 2;
const MIN_DURATION = 10 * 60 * 1000;
const MAX_DURATION = 120 * 60 * 1000;

// get random number from min ab max, but max not included
const getRandomNumber = (max, min = 0) =>{
  if (min >= max) {
    throw new Error(`Invalid input, min is bigger then max`);
  }
  return Math.floor((Math.random() * (max - min)) + min);
};

const getRandomElementFromArray = (array) => {
  return array[getRandomNumber(array.length)];
};

const getPOIPhotoURL = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

const getDescription = () => {
  const quantity = getRandomNumber(MAX_DESCRTIPTION_QUANTITY + 1, MIN_DESCRTIPTION_QUANTITY);
  let result = ``;
  for (let i = 0; i < quantity; i++) {
    result += getRandomElementFromArray(DESCRIPTION_ITEMS) + ` `;
  }
  return result;
};

const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 4 + getRandomNumber(8));
  return date;
};

const getDateEnd = (startDate) => {
  const duration = getRandomNumber(MAX_DURATION, MIN_DURATION);
  return new Date(startDate.getTime() + duration);
};

const getServices = () => {
  const quantity = getRandomNumber(MAX_SERVICES_QUANTITY + 1, MIN_SERVICES_QUANTITY);
  const result = [];
  for (let i = 0; i < quantity; i++) {
    result.push(getRandomElementFromArray(SERVICES));
  }
  return result;
};

export const generateEvent = () => {
  const startDate = getRandomDate();
  return {
    eventType: getRandomElementFromArray(EVENT_TYPES),
    town: getRandomElementFromArray(TOWNS),
    photo: getPOIPhotoURL(),
    description: getDescription(),
    startDate,
    endDate: getDateEnd(startDate),
    price: getRandomNumber(1000, 20),
    services: getServices()
  };
};

export const generateEvents = (quantity) => {
  const result = [];
  for (let i = 0; i < quantity; i++) {
    result.push(generateEvent());
  }
  return result;
};
