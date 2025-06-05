import { TMDBImage } from '.';

export interface TMDBNetworkDetails {
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TMDBNetworkImages {
  id: number;
  logos: TMDBImage[];
}
