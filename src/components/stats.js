import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {EVENT_TYPES} from '../const.js';

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
  }

  prepareData(events) {
    let dataTypes = [];
    EVENT_TYPES.moving.forEach((type) => {
      let price = 0;
      for (const event of events) {
        if (event.type === type) {
          price += event.price;
        }
      }
      dataTypes.push({type, price});
    });
    EVENT_TYPES.place.forEach((type) => {
      let price = 0;
      for (const event of events) {
        if (event.type === type) {
          price += event.price;
        }
      }
      dataTypes.push({type, price});
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
      types.push(dataType.type.toUpperCase());
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
              fontSize: 13,
              fontStyle: `bold`
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
