import { TMDBMovie, TMDBTV } from '.';

export type TMDBMonetizationType = 'flatrate' | 'free' | 'ads' | 'rent' | 'buy';

export interface TMDBDiscoverQueryOptions {
  'language'?: string;
  'sort_by'?: TMDBSortOption;
  'page'?: number;
  'vote_average.gte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  'vote_average.lte'?: number;
  'with_watch_providers'?: string;
  'watch_region'?: string;
  'without_companies'?: string;
  'with_watch_monetization_types'?: TMDBMonetizationType;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  'with_genres'?: string;
  'without_genres'?: string;
  'with_original_language'?: string;
  'without_keywords'?: string;
  'with_keywords'?: string;
  'with_companies'?: string;
  'include_adult'?: boolean;
}

export interface TMDBMovieQueryOptions extends TMDBDiscoverQueryOptions {
  'region'?: string;
  'certification_country'?: string;
  'certification'?: string;
  'certification.lte'?: string;
  'certification.gte'?: string;
  'include_adult'?: boolean;
  'include_video'?: boolean;
  'primary_release_year'?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'with_release_type'?: string;
  'year'?: number;
  'with_cast'?: string;
  'with_crew'?: string;
  'with_people'?: string;
}

export interface TMDBTvShowQueryOptions extends TMDBDiscoverQueryOptions {
  'air_date.gte'?: string;
  'air_date.lte'?: string;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  'first_air_date_year'?: number;
  'timezone'?: string;
  'with_networks'?: string;
  'include_null_first_air_dates'?: boolean;
  'screened_theatrically'?: boolean;
  'with_status'?: string;
  'with_type'?: string;
}

export type TMDBSortOption =
  | 'first_air_date.asc'
  | 'first_air_date.desc'
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc';

export interface TMDBMovieDiscoverResult {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

export interface TMDBTvShowDiscoverResult {
  page: number;
  results: TMDBTV[];
  total_results: number;
  total_pages: number;
}
