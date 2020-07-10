export const getMonthShortName = (date) => {
  return date.toString().slice(4, 7).toUpperCase();
};

export const getDateAndTimeFormatString = (date) => {
  const dateString = date.toLocaleDateString(`en-US`, {day: `2-digit`, month: `2-digit`, year: `2-digit`});
  const timeString = date.toLocaleTimeString(`ru-RU`, {hour: `2-digit`, minute: `2-digit`});
  return (
    `${dateString} ${timeString}`
  );
};
