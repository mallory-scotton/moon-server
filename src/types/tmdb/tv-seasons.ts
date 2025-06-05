import { TMDBEpisode } from '.';

export interface TMDBSeasonSelection {
  tvShowID: number;
  seasonNumber: number;
}

export interface TMDBSeasonDetails {
  air_date: string;
  episodes: TMDBEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
}

export type TMDBTvSeasonChangeValue =
  | string
  | {
      episode_id: number;
      episode_number: number;
    };
