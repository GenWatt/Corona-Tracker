import { ApiInterface, ApiDailyInterface, ApiDataInterface } from "../apiInterface";
import { DOMElements } from "../DOMElements.ts";
import { state } from "../config.ts";
import { lineChart, doughnutChart } from "./charts.ts";
import Error from "./Error.ts";
import Loader from "./loader.ts";
import axios from "axios";
import { GLOBAL, TOTAL, DAILY } from "../config.ts";

class GetData {
  readonly url: string;
  private deaths: number | null;
  private recovered: number | null;
  private confirmed: number | null;
  private lastUpdate: string;
  private dailyData: ApiDailyInterface[] | null;

  constructor() {
    this.url = "https://covid19.mathdro.id/api/";
    this.deaths = null;
    this.recovered = null;
    this.confirmed = null;
    this.lastUpdate = "";
    this.dailyData = null;
  }

  public async getCovidData(country?: string) {
    let url: string = this.url;

    if (!state.search || (state.search === country && state.dataType === TOTAL)) return;
    if (country) {
      url = url + "countries/" + country;
      state.search = country;
      sessionStorage.setItem("country", country);
    } else state.search = GLOBAL;

    Loader.showLoader();

    try {
      const res: ApiInterface = await axios.get(url);

      sessionStorage.setItem("search", country || GLOBAL);
      state.dataType = TOTAL;
      this.setActiveBtn();
      this.setData(res.data);
      this.setInputValue(country || GLOBAL);

      Error.hideError();
      Loader.hideLoader();
    } catch (error) {
      Error.showError(error.response.data.error.message);
      Loader.hideLoader();
    }
  }

  private setInputValue(value) {
    DOMElements.selectCountry.value = value.toLowerCase();
    DOMElements.searchCountryInput.value = value;
  }

  public async getDailyData() {
    let url: string = this.url + "daily/";

    if (state.dataType === DAILY) return;
    Loader.showLoader();
    try {
      const res = await axios.get(url);

      state.dataType = DAILY;

      this.dailyData = res.data;
      this.setActiveBtn();
      this.chartFactory();
      Error.hideError();
      Loader.hideLoader();
    } catch (error) {
      Error.showError(error.response.data.error.message);
      Loader.hideLoader();
    }
  }

  private setActiveBtn() {
    DOMElements.optionBtns.forEach((btn: HTMLElement) => btn.classList.remove("active"));
    document.getElementById(state.dataType.toLowerCase()).classList.add("active");
  }

  private setData(data: ApiDataInterface) {
    const { confirmed, deaths, recovered, lastUpdate } = data;

    this.deaths = deaths.value;
    this.recovered = recovered.value;
    this.confirmed = confirmed.value;
    this.lastUpdate = lastUpdate.toLocaleString();

    this.chartFactory();
    this.render();
  }

  private render() {
    DOMElements.totalCases.innerText = this.confirmed.toLocaleString();
    DOMElements.totalDeaths.innerText = this.deaths.toLocaleString();
    DOMElements.totalRecovered.innerText = this.recovered.toLocaleString();
    DOMElements.searchHeader.innerText = state.search.toUpperCase();
    DOMElements.lastUpdate.innerText = "Last Update: " + new Date(this.lastUpdate).toDateString();
  }

  private chartFactory() {
    switch (state.dataType) {
      case TOTAL:
        doughnutChart({
          deaths: this.deaths,
          confirmed: this.confirmed,
          recovered: this.recovered,
        });
        break;
      case DAILY:
        lineChart(this.dailyData);
        break;
      default:
        return;
    }
  }
}

export default GetData;
