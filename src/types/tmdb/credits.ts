import { TMDBCountryCode, TMDBImage, TMDBPerson } from '.';

export interface TMDBCreditSeason {
  air_date?: string;
  poster_path?: string;
  season_number?: number;
}

export interface TMDBMedia {
  id?: number;
  name?: string;
  first_air_date?: string;
  vote_count?: number;
  overview?: string;
  vote_average?: number;
  backdrop_path?: string;
  genre_ids?: number[];
  media_type: string;
  adult: boolean;
  original_name?: string;
  origin_country?: string[];
  poster_path?: string;
  original_language?: string;
  popularity?: number;
  character?: string;
  episodes?: string[];
  seasons?: TMDBCreditSeason[];
}

export interface TMDBCreditResponse {
  credit_type?: string;
  department?: string;
  job?: string;
  media?: TMDBMedia;
  media_type?: string;
  id?: string;
  person?: TMDBPerson;
}

export interface TMDBTitle {
  iso_3166_1: TMDBCountryCode;
  title: string;
  type: string;
}

export interface TMDBAlternativeTitles {
  id: number;
  titles: TMDBTitle[];
}

export interface TMDBCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface TMDBCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface TMDBCredits {
  id: number;
  cast: TMDBCast[];
  crew: TMDBCrew[];
}

export interface TMDBImageCollection {
  id: number;
  backdrops: TMDBImage[];
  posters: TMDBImage[];
}
export interface TMDBVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: TMDBCountryCode;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface TMDBVideos {
  id: number;
  results: TMDBVideo[];
}

export interface TMDBAggregateCredits {
  id: number;
  cast: TMDBAggregateCast[];
  crew: TMDBAggregateCrew[];
}

export interface TMDBCastRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface TMDBAggregateCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: TMDBCastRole[];
  total_episode_count: number;
  order: number;
}

export interface TMDBCrewJob {
  credit_id: string;
  job: string;
  episode_count: number;
}

export interface TMDBAggregateCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  jobs: TMDBCrewJob[];
  department: string;
  total_episode_count: number;
}
