import { TMDBImage } from '.';

export interface TMDBCompanyDetails {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company?: TMDBParentCompany;
}

export interface TMDBParentCompany {
  name: string;
  id: number;
  logo_path: string;
}

export interface TMDBAlternativeNames {
  id: number;
  results: TMDBName[];
}

export interface TMDBName {
  name: string;
  type: string;
}

export interface TMDBCompanyImages {
  id: number;
  logos: TMDBImage[];
}
