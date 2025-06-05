import { TMDBCountryCode } from '.';

export interface TMDBRegion {
  iso_3166_1: TMDBCountryCode;
  english_name: string;
  native_name: string;
}
