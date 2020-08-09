import { DOMElements } from "../DOMElements.ts";
import Error from "./Error.ts";
import axios from "axios";
import { CountriesApiInterface } from "../apiInterface";
import { state } from "../config.ts";

class Dropdown {
  readonly url: string;
  constructor() {
    this.url = "https://covid19.mathdro.id/api/countries/";
  }

  private getCountries = async (): Promise<CountriesApiInterface> => await axios.get(this.url);

  public async createOptions() {
    try {
      const { data } = await this.getCountries();

      data.countries.forEach(({ name }) => {
        const option = document.createElement("option");
        option.value = name.toLowerCase();
        option.innerText = name;

        DOMElements.selectCountry.appendChild(option);
      });
    } catch ({ message }) {
      Error.showError(message);
    }
  }
}
export default Dropdown;
