import { TMDBMovie } from '.';
import { TMDBPageOption } from './options';

export interface TMDBKeywordsOptions extends TMDBPageOption {
  include_adult?: boolean;
  language?: string;
}

export interface TMDBBelongingMovies {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

export interface TMDBKeyword {
  id: number;
  name: string;
}

export interface TMDBKeywords {
  id: number;
  keywords: TMDBKeyword[];
}
