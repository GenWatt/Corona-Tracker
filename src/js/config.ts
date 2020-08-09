import { CountryApiInterface } from "./apiInterface";

export const GLOBAL = "GLOBAL";
export const TOTAL = "TOTAL";
export const DAILY = "DAILY";

type DataTypes = "TOTAL" | "DAILY" | "";

interface StateInterface {
  search: string;
  dataType: DataTypes;
}

export const state: StateInterface = {
  search: GLOBAL,
  dataType: "",
};
