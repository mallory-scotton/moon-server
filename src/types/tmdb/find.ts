import { TMDBEpisode, TMDBMediaType, TMDBMovie, TMDBPerson, TMDBSeason, TMDBTV } from '.';

export type TMDBExternalSource =
  | 'imdb_id'
  | 'freebase_mid'
  | 'freebase_id'
  | 'tvdb_id'
  | 'tvrage_id'
  | 'facebook_id'
  | 'twitter_id'
  | 'instagram_id';

export interface TMDBExternalIdOptions {
  external_source: TMDBExternalSource;
  language?: string;
}

type TMDBMediaTagged<T> = T & {
  media_type: TMDBMediaType;
};

export interface TMDBFindResult {
  movie_results: TMDBMediaTagged<TMDBMovie>[];
  person_results: TMDBMediaTagged<TMDBPerson>[];
  tv_results: TMDBMediaTagged<TMDBTV>[];
  tv_episode_results: TMDBMediaTagged<TMDBEpisode>[];
  tv_season_results: TMDBMediaTagged<TMDBSeason & { show_id: string }>[];
}
