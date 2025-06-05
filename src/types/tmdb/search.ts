import {
  TMDBMovieWithMediaType,
  TMDBPersonWithMediaType,
  TMDBTVWithMediaType,
  TMDBLanguageOption,
  TMDBPageOption,
  TMDBRegionOption
} from '.';

export interface TMDBSearch<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type TMDBMultiSearchResult = TMDBMovieWithMediaType | TMDBTVWithMediaType | TMDBPersonWithMediaType;

export interface TMDBSearchOptions {
  query: string;
  page?: number;
}

export interface TMDBMovieSearchOptions
  extends TMDBSearchOptions,
    TMDBLanguageOption,
    TMDBPageOption,
    TMDBRegionOption {
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
}

export interface TMDBCollectionSearchOptions
  extends TMDBSearchOptions,
    TMDBLanguageOption,
    TMDBPageOption,
    TMDBRegionOption {
  include_adult?: boolean;
}

export interface TMDBTvSearchOptions extends TMDBSearchOptions, TMDBLanguageOption, TMDBPageOption {
  include_adult?: boolean;
  year?: number;
  first_air_date_year?: number;
}

export interface TMDBPeopleSearchOptions extends TMDBSearchOptions, TMDBLanguageOption, TMDBPageOption {
  include_adult?: boolean;
}

export interface TMDBMultiSearchOptions extends TMDBSearchOptions, TMDBLanguageOption, TMDBPageOption {
  include_adult?: boolean;
}
