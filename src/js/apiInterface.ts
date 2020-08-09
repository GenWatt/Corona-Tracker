export interface StatisticInterface {
  confirmed: number;
  recovered: number;
  deaths: number;
}

export interface Keys {
  value: number;
  detail: string;
}

export interface ApiInterface {
  data: ApiDataInterface;
}

export interface ApiDataInterface {
  confirmed: Keys;
  recovered: Keys;
  deaths: Keys;
  lastUpdate: Date;
  error: any;
}

export interface ApiDailyInterface {
  confirmed: { total: number };
  deaths: { total: number };
  reportDate: Date;
}

export interface CountryApiInterface {
  name: string;
  iso2: string;
  iso3: string;
}

export interface CountriesApiInterface {
  data: {
    countries: CountryApiInterface[];
  };
}
