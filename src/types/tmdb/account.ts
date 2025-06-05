import { TMDBCountryCode } from '.';

export interface TMDBGravatar {
  hash: string;
}

export interface TMDBAvatar {
  gravatar: TMDBGravatar;
}

export interface TMDBAccountDetails {
  avatar: TMDBAvatar;
  id: number;
  include_adult: boolean;
  iso_3166_1: TMDBCountryCode;
  iso_639_1: string;
  name: string;
  username: string;
}
