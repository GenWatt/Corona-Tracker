import Chart from "chart.js";
import { StatisticInterface, ApiDailyInterface } from "../apiInterface";
import { DOMElements } from "../DOMElements.ts";
import { GLOBAL } from "../config.ts";

let createdChart;

export function doughnutChart(data: StatisticInterface) {
  const c = document.getElementById("summary-chart") as HTMLCanvasElement;
  const ctx = c.getContext("2d");
  const chartData: number[] = [];

  if (createdChart) createdChart.destroy();
  if (data instanceof Object) Object.entries(data).forEach(([key, entry]) => chartData.push(entry));

  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Total Deaths", "Total Cases", "Total Recovered"],
      datasets: [
        {
          label: "Deaths",
          backgroundColor: ["red", "yellow", "yellowgreen"],
          borderColor: "rgb(255, 99, 132)",
          data: chartData,
        },
      ],
    },
    options: {
      legend: {
        labels: {
          fontSize: 16,
          fontColor: "white",
        },
      },
    },
  });
  createdChart = chart;
}

export function lineChart(data: ApiDailyInterface[]) {
  const c = document.getElementById("summary-chart") as HTMLCanvasElement;
  const ctx = c.getContext("2d");

  if (createdChart) createdChart.destroy();
  const confirmedData: number[] = [];
  const deathsData: number[] = [];
  const raportData: Date[] = [];

  data.map(({ confirmed }, index) => {
    if (index % 5 === 0 || index === data.length) confirmedData.push(confirmed.total);
  });

  data.map(({ deaths }, index) => {
    if (index % 5 === 0 || index === data.length) deathsData.push(deaths.total);
  });

  data.map((details, index) => {
    if (index % 5 === 0 || index === data.length) raportData.push(details.reportDate);
  });

  DOMElements.searchHeader.innerText = GLOBAL;

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: raportData,
      datasets: [
        {
          label: "Deaths",
          backgroundColor: "red",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: deathsData,
        },
        {
          label: "Confirmed",
          backgroundColor: "yellow",
          fill: true,
          borderColor: "rgb(255, 99, 132)",
          data: confirmedData,
        },
      ],
    },
  });
  createdChart = chart;
}
