import {
  TMDBCountryCode,
  TMDBGenre,
  TMDBMovie,
  TMDBProductionCompany,
  TMDBProductionCountry,
  TMDBSpokenLanguage
} from '.';

export interface TMDBBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface TMDBMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: TMDBBelongsToCollection;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum TMDBReleaseDateType {
  'Premiere' = 1,
  'Theatrical (limited)',
  'Theatrical',
  'Digital',
  'Physical',
  'TV'
}

export interface TMDBReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  release_date: string;
  type: TMDBReleaseDateType;
  note: string;
}

export interface TMDBReleaseDateResult {
  iso_3166_1: TMDBCountryCode;
  release_dates: TMDBReleaseDate[];
}

export interface TMDBReleaseDates {
  id: number;
  results: TMDBReleaseDateResult[];
}

export interface TMDBSimilarMovies {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovieList {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string;
}

export interface TMDBMovieLists {
  id: number;
  page: number;
  results: TMDBMovieList[];
  total_pages: number;
  total_results: number;
}

export interface TMDBLatestMovie {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: TMDBBelongsToCollection;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDBDates {
  maximum: string;
  minimum: string;
}

export interface TMDBMoviesPlayingNow {
  page: number;
  results: TMDBMovie[];
  dates: TMDBDates;
  total_pages: number;
  total_results: number;
}

export interface TMDBPopularMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

export interface TMDBTopRatedMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

export interface TMDBUpcomingMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

export type TMDBMovieChangeValue =
  | string
  | {
      person_id: number;
      character: string;
      order: number;
      cast_id: number;
      credit_id: string;
    }
  | unknown;
