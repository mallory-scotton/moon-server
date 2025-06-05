export interface TMDBMediaChange {
  id: number;
  adult?: boolean;
}

export interface TMDBMediaChanges {
  results: TMDBMediaChange[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface TMDBChanges<T> {
  changes: TMDBChange<T>[];
}

export interface TMDBChange<T> {
  key: string;
  items: TMDBChangeItem<T>[];
}

export interface TMDBChangeItem<T> {
  id: string;
  action: string;
  time: string;
  value: T;
  iso_639_1: string;
  original_value: T;
}
