import { TMDBReview } from '.';

export interface TMDBReviewDetails extends TMDBReview {
  iso_639_1: string;
  media_id: number;
  media_title: number;
  media_type: number;
}
