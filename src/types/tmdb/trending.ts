import {
  TMDBMovie,
  TMDBPerson,
  TMDBTV,
  TMDBMediaType,
  TMDBMovieWithMediaType,
  TMDBTVWithMediaType,
  TMDBPersonWithMediaType
} from '.';

export type TMDBTimeWindow = 'day' | 'week';

export type TMDBTrendingMediaType = TMDBMediaType | 'all';

type TMDBTrendingResult<T extends TMDBTrendingMediaType> = T extends 'tv'
  ? TMDBTV
  : T extends 'movie'
  ? TMDBMovie
  : T extends 'person'
  ? TMDBPerson
  : TMDBTVWithMediaType | TMDBMovieWithMediaType | TMDBPersonWithMediaType;

export interface TMDBTrendingResults<T extends TMDBTrendingMediaType> {
  page: number;
  results: TMDBTrendingResult<T>[];
  total_pages: number;
  total_results: number;
}
