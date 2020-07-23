import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {EVENT_TYPES, EVENT_EMOJI} from '../const.js';

const getStringForTime = (data) => {
  return (`0` + data).slice(-2);
};

const getStatsTemplate = () => {
  return (
    `<section class="statistics">
        <h2 class="visually-hidden">Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>`
  );
};

export default class StatsComponent extends AbstractSmartComponent {
  getTemplate() {
    return getStatsTemplate();
  }

  renderAllCharts(events) {
    this.renderMoneyChart(events);
    this.renderTransportChart(events);
    this.renderTimeSpentChart(events);
  }

  recoveryListeners() {

  }

  rerender(events) {
    super.rerender();
    this.hide();
    this.renderAllCharts(events);
  }

  prepareData(events) {
    let dataTypes = [];
    EVENT_TYPES.moving.forEach((type) => {
      let price = 0;
      let count = 0;
      let durationTime = 0;
      for (const event of events) {
        if (event.type === type) {
          price += +event.price;
          count++;
          durationTime += new Date(event.endDate - event.startDate).getTime();
        }
      }
      dataTypes.push({type, price, count, durationTime});
    });
    EVENT_TYPES.place.forEach((type) => {
      let price = 0;
      let durationTime = 0;
      for (const event of events) {
        if (event.type === type) {
          price += +event.price;
          durationTime += new Date(event.endDate - event.startDate).getTime();
        }
      }
      dataTypes.push({type, price, durationTime});
    });

    return dataTypes;
  }

  renderMoneyChart(events) {
    const moneyChartElement = this.getElement().querySelector(`.statistics__chart--money`);

    const datas = this.prepareData(events).sort((a, b) => b.price - a.price).filter((dataType) => {
      return dataType.price !== 0;
    });

    let types = [];
    let typesPrice = [];

    for (const dataType of datas) {
      types.push(dataType.type);
      typesPrice.push(dataType.price);
    }

    return new Chart(moneyChartElement, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: types,
        datasets: [{
          data: typesPrice,
          backgroundColor: `rgb(255, 255, 255)`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter(value) {
              return `€ ` + value;
            },
            anchor: `end`,
            clamp: true,
            align: `start`,
            color: `black`
          },
        },
        title: {
          display: true,
          position: `left`,
          text: `MONEY`,
          fontColor: `#000`,
          fontSize: 30
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: true,
              fontSize: 15,
              fontStyle: `bold`,
              callback(value) {
                return EVENT_EMOJI[value] + ` ` + value.toUpperCase();
              }
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
      }
    });
  }

  renderTimeSpentChart(events) {
    const timeChartElement = this.getElement().querySelector(`.statistics__chart--time`);

    const datas = this.prepareData(events).filter((type) => type.durationTime).sort((a, b) => b.durationTime - a.durationTime);
    let types = [];
    let typesDurationTime = [];

    for (const dataType of datas) {
      types.push(dataType.type);

      typesDurationTime.push(dataType.durationTime);
    }

    return new Chart(timeChartElement, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: types,
        datasets: [{
          data: typesDurationTime,
          backgroundColor: `rgb(255, 255, 255)`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter(value) {
              const durationTime = new Date(value);
              const durationDays = durationTime.getUTCDate() - 1;
              const durationHours = durationTime.getUTCHours();
              const durationMinutes = durationTime.getUTCMinutes();

              return (
                `${durationDays > 0 ? `${getStringForTime(durationDays)}D ` : ``}${durationHours > 0 ? `${getStringForTime(durationHours)}H ` : ``}${getStringForTime(durationMinutes)}M`
              );
            },
            anchor: `end`,
            clamp: true,
            align: `start`,
            color: `black`
          },
        },
        title: {
          display: true,
          position: `left`,
          text: `TIME SPENT`,
          fontColor: `#000`,
          fontSize: 30
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: true,
              fontSize: 15,
              fontStyle: `bold`,
              callback(value) {
                return EVENT_EMOJI[value] + ` ` + value.toUpperCase();
              }
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
      }
    });
  }

  renderTransportChart(events) {
    const transportChartElement = this.getElement().querySelector(`.statistics__chart--transport`);

    const datas = this.prepareData(events).filter((type) => type.count).sort((a, b) => b.count - a.count);
    let types = [];
    let typesCount = [];

    for (const dataType of datas) {
      types.push(dataType.type);
      typesCount.push(dataType.count);
    }

    return new Chart(transportChartElement, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: types,
        datasets: [{
          data: typesCount,
          backgroundColor: `rgb(255, 255, 255)`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter(value) {
              return value + ` x`;
            },
            anchor: `end`,
            clamp: true,
            align: `start`,
            color: `black`
          },
        },
        title: {
          display: true,
          position: `left`,
          text: `TRANSPORT`,
          fontColor: `#000`,
          fontSize: 30
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: true,
              fontSize: 15,
              fontStyle: `bold`,
              callback(value) {
                return EVENT_EMOJI[value] + ` ` + value.toUpperCase();
              }
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
      }
    });
  }
}
