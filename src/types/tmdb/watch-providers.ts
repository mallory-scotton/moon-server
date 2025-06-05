import { TMDBRegion } from './regions';
import { TMDBCountryCode } from '.';

export interface TMDBWatchProvider {
  display_priorities: { [K in TMDBCountryCode]: number };
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface TMDBRegionResult {
  results: Array<TMDBRegion>;
}

export interface TMDBWatchProviderResult {
  results: Array<TMDBWatchProvider>;
}

export interface TMDBFlatrate {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface TMDBRent {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface TMDBBuy {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface TMDBWatchLocale {
  AR: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  AT: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  AU: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  BE: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  BR: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  CA: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  CH: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  CL: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  CO: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  CZ: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  DE: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  DK: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  EC: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  EE: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  ES: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  FI: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  FR: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  GB: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  GR: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  HU: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  ID: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  IE: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  IN: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  IT: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
  };
  JP: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  KR: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  LT: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  LV: {
    link: string;
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  MX: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  MY: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  NL: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  NO: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  NZ: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  PE: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  PH: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  PL: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  PT: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  RO: {
    link: string;
    flatrate: TMDBFlatrate[];
  };
  RU: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  SE: {
    link: string;
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
  };
  SG: {
    link: string;
    flatrate: TMDBFlatrate[];
    buy: TMDBBuy[];
    rent: TMDBRent[];
  };
  TH: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  TR: {
    link: string;
    buy: TMDBBuy[];
    rent: TMDBRent[];
    flatrate: TMDBFlatrate[];
  };
  US: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
  VE: {
    link: string;
    flatrate: TMDBFlatrate[];
    rent: TMDBRent[];
    buy: TMDBBuy[];
  };
  ZA: {
    link: string;
    rent: TMDBRent[];
    buy: TMDBBuy[];
    flatrate: TMDBFlatrate[];
  };
}

export interface TMDBWatchProviders {
  id: number;
  results: TMDBWatchLocale;
}
