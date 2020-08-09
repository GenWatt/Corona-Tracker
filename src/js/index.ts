import "../scss/style.scss";
import { DOMElements } from "./DOMElements.ts";
import GetData from "./components/fetchData.ts";
import Dropdown from "./components/countriesDropdown.ts";
import { state, GLOBAL, TOTAL, DAILY } from "./config.ts";

function init() {
  const getData = new GetData();
  const createOptions = new Dropdown();
  const savedValue: string = sessionStorage.getItem("search") || GLOBAL;

  DOMElements.optionBtns.forEach((btn: HTMLElement) => {
    btn.addEventListener("click", (e: any) => {
      const btnValue: string = e.target.value;

      switch (btnValue.toUpperCase()) {
        case TOTAL:
          validation(state.search);
          break;
        case DAILY:
          getData.getDailyData();
          break;
        default:
          return;
      }
    });
  });
  createOptions.createOptions();

  function validation(value: string) {
    if (
      (value.toUpperCase() === GLOBAL && state.search !== GLOBAL) ||
      (state.dataType !== TOTAL && value.toUpperCase() === GLOBAL)
    )
      getData.getCovidData();
    else if (value && value.toUpperCase() !== GLOBAL) getData.getCovidData(value);
  }

  DOMElements.selectCountry.addEventListener("change", (e: any) => validation(e.target.value));

  DOMElements.searchCountryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const value: string = DOMElements.searchCountryInput.value;

    validation(value);
  });

  validation(savedValue);
}

window.addEventListener("DOMContentLoaded", init);
