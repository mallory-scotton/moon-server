import axios from 'axios';
import * as types from '../../types/tmdb';

class TMDBService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly accessToken: string;
  private readonly imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /** eslint-disable @typescript-eslint/no-explicit-any */
  private async get<T>(path: string, options?: Record<string, any>): Promise<T> {
    const params = options ? new URLSearchParams(Object.entries(options).filter(([, v]) => v)).toString() : '';
    const response = await axios.get(`${this.baseUrl}${path}?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    if (response.status < 200 || response.status >= 300) {
      return Promise.reject(response.data as types.TMDBErrorResponse);
    }

    return response.data as T;
  }

  async searchCompany(options: types.TMDBSearchOptions): Promise<types.TMDBSearch<types.TMDBCompany>> {
    return await this.get<types.TMDBSearch<types.TMDBCompany>>('/search/company', options);
  }

  async searchCollection(options: types.TMDBSearchOptions): Promise<types.TMDBSearch<types.TMDBCollection>> {
    return await this.get<types.TMDBSearch<types.TMDBCollection>>('/search/collection', options);
  }

  async searchKeyword(options: types.TMDBSearchOptions): Promise<types.TMDBSearch<{ id: string; name: string }>> {
    return await this.get<types.TMDBSearch<{ id: string; name: string }>>('/search/keyword', options);
  }

  async searchMovie(options: types.TMDBMovieSearchOptions): Promise<types.TMDBSearch<types.TMDBMovie>> {
    return await this.get<types.TMDBSearch<types.TMDBMovie>>('/search/movie', options);
  }

  async searchPerson(options: types.TMDBPeopleSearchOptions): Promise<types.TMDBSearch<types.TMDBPerson>> {
    return await this.get<types.TMDBSearch<types.TMDBPerson>>('/search/person', options);
  }

  async searchTvShow(options: types.TMDBTvSearchOptions): Promise<types.TMDBSearch<types.TMDBTV>> {
    return await this.get<types.TMDBSearch<types.TMDBTV>>('/search/tv', options);
  }

  async searchMulti(options: types.TMDBMultiSearchOptions): Promise<types.TMDBSearch<types.TMDBMultiSearchResult>> {
    return await this.get<types.TMDBSearch<types.TMDBMultiSearchResult>>('/search/multi', options);
  }

  async getAccountDetails(): Promise<types.TMDBAccountDetails> {
    return await this.get<types.TMDBAccountDetails>('/account');
  }

  async getMovieCertifications(): Promise<types.TMDBCertifications> {
    return await this.get<types.TMDBCertifications>('/certification/movie/list');
  }

  async getTvShowCertifications(): Promise<types.TMDBCertifications> {
    return await this.get<types.TMDBCertifications>('/certification/tv/list');
  }

  async getMoviesChanges(options?: types.TMDBChangeOption): Promise<types.TMDBMediaChanges> {
    return await this.get<types.TMDBMediaChanges>('/movie/changes', options);
  }

  async getTvShowsChanges(options?: types.TMDBChangeOption): Promise<types.TMDBMediaChanges> {
    return await this.get<types.TMDBMediaChanges>('/tv/changes', options);
  }

  async getPeopleChanges(options?: types.TMDBChangeOption): Promise<types.TMDBMediaChanges> {
    return await this.get<types.TMDBMediaChanges>('/person/changes', options);
  }

  async getTrending<T extends types.TMDBTrendingMediaType>(
    mediaType: T,
    timeWindow: types.TMDBTimeWindow,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBTrendingResults<T>> {
    return await this.get<types.TMDBTrendingResults<T>>(`/trending/${mediaType}/${timeWindow}`, options);
  }

  async getReviewDetails(id: string): Promise<types.TMDBReviewDetails> {
    return await this.get<types.TMDBReviewDetails>(`/review/${id}`);
  }

  async getNetworkDetails(id: number): Promise<types.TMDBNetworkDetails> {
    return await this.get<types.TMDBNetworkDetails>(`/network/${id}`);
  }

  async getNetworkAlternativeNames(id: number): Promise<types.TMDBAlternativeNames> {
    return await this.get<types.TMDBAlternativeNames>(`/network/${id}/alternative_names`);
  }

  async getNetworkImages(id: number): Promise<types.TMDBNetworkImages> {
    return await this.get<types.TMDBNetworkImages>(`/network/${id}/images`);
  }

  async getWatchProviderRegions(options?: types.TMDBLanguageOption): Promise<types.TMDBRegionResult> {
    return await this.get<types.TMDBRegionResult>('/watch/providers/regions', options);
  }

  async getMovieProviders(options?: types.TMDBProviderOptions): Promise<types.TMDBWatchProviderResult> {
    return await this.get<types.TMDBWatchProviderResult>('/watch/providers/movie', options);
  }

  async getTvShowProviders(options?: types.TMDBProviderOptions): Promise<types.TMDBWatchProviderResult> {
    return await this.get<types.TMDBWatchProviderResult>('/watch/providers/tv', options);
  }

  async getCollectionDetails(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBCollectionDetails> {
    return await this.get<types.TMDBCollectionDetails>(`/collection/${id}`, options);
  }

  async getCollectionImages(
    id: number,
    options?: types.TMDBCollectionImageOptions
  ): Promise<types.TMDBImageCollection> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    return await this.get<types.TMDBImageCollection>(`/collection/${id}/images`, computedOptions);
  }

  async getCollectionTranslations(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBTranslation> {
    return await this.get<types.TMDBTranslation>(`/collection/${id}/translations`, options);
  }

  async getCompanyDetails(id: number): Promise<types.TMDBCompanyDetails> {
    return await this.get<types.TMDBCompanyDetails>(`/company/${id}`);
  }

  async getCompanyAlternativeNames(id: number): Promise<types.TMDBAlternativeNames> {
    return await this.get<types.TMDBAlternativeNames>(`/company/${id}/alternative_names`);
  }

  async getCompanyImages(id: number): Promise<types.TMDBCompanyImages> {
    return await this.get<types.TMDBCompanyImages>(`/company/${id}/images`);
  }

  async getApiConfiguration(): Promise<types.TMDBConfiguration> {
    return await this.get<types.TMDBConfiguration>('/configuration');
  }

  async getCountries(): Promise<types.TMDBCountryConfiguration[]> {
    return await this.get<types.TMDBCountryConfiguration[]>('/configuration/countries');
  }

  async getLanguages(): Promise<types.TMDBLanguageConfiguration[]> {
    return await this.get<types.TMDBLanguageConfiguration[]>('/configuration/languages');
  }

  async getJobs(): Promise<types.TMDBJobConfiguration[]> {
    return await this.get<types.TMDBJobConfiguration[]>('/configuration/jobs');
  }

  async getPrimaryTranslations(): Promise<string[]> {
    return await this.get<string[]>('/configuration/primary_translations');
  }

  async getTimezones(): Promise<types.TMDBTimezoneConfiguration[]> {
    return await this.get<types.TMDBTimezoneConfiguration[]>('/configuration/timezones');
  }

  async getCredits(id: number): Promise<types.TMDBCreditResponse> {
    return await this.get<types.TMDBCreditResponse>(`/credit/${id}`);
  }

  async discoverMovies(options?: types.TMDBMovieQueryOptions): Promise<types.TMDBMovieDiscoverResult> {
    return await this.get<types.TMDBMovieDiscoverResult>('/discover/movie', options);
  }

  async discoverTvShows(options?: types.TMDBTvShowQueryOptions): Promise<types.TMDBTvShowDiscoverResult> {
    return await this.get<types.TMDBTvShowDiscoverResult>('/discover/tv', options);
  }

  async findByExternalId(id: string, options: types.TMDBExternalIdOptions): Promise<types.TMDBFindResult> {
    return await this.get<types.TMDBFindResult>(`/find/${id}`, options);
  }

  async getMovieGenres(options?: types.TMDBLanguageOption): Promise<types.TMDBGenres> {
    return await this.get<types.TMDBGenres>('/genre/movie/list', options);
  }

  async getTvShowGenres(options?: types.TMDBLanguageOption): Promise<types.TMDBGenres> {
    return await this.get<types.TMDBGenres>('/genre/tv/list', options);
  }

  async getKeywordDetails(id: number): Promise<types.TMDBKeyword> {
    return await this.get<types.TMDBKeyword>(`/keyword/${id}`);
  }

  async getPersonDetails<T extends types.TMDBAppendToResponsePersonKey[] | undefined>(
    id: number,
    appendToResponse?: T,
    language?: string
  ) {
    const options = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      language: language
    };
    return await this.get<types.TMDBAppendToResponse<types.TMDBPersonDetails, T, 'person'>>(`/person/${id}`, options);
  }

  async getPersonChanges(
    id: number,
    options?: types.TMDBChangeOption
  ): Promise<types.TMDBChanges<types.TMDBPersonChangeValue>> {
    return await this.get<types.TMDBChanges<types.TMDBPersonChangeValue>>(`/person/${id}/changes`, options);
  }

  async getPersonMovieCredits(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBPersonMovieCredit> {
    return await this.get<types.TMDBPersonMovieCredit>(`/person/${id}/movie_credits`, options);
  }

  async getPersonTvShowCredits(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBPersonTvShowCredit> {
    return await this.get<types.TMDBPersonTvShowCredit>(`/person/${id}/tv_credits`, options);
  }

  async getPersonCombinedCredits(
    id: number,
    options?: types.TMDBLanguageOption
  ): Promise<types.TMDBPersonCombinedCredits> {
    return await this.get<types.TMDBPersonCombinedCredits>(`/person/${id}/combined_credits`, options);
  }

  async getPersonExternalId(id: number): Promise<types.TMDBExternalIds> {
    return await this.get<types.TMDBExternalIds>(`/person/${id}/external_ids`);
  }

  async getPersonImages(id: number): Promise<types.TMDBPeopleImages> {
    return await this.get<types.TMDBPeopleImages>(`/person/${id}/images`);
  }

  async getPersonTranslations(id: number): Promise<types.TMDBPersonTranslations> {
    return await this.get<types.TMDBPersonTranslations>(`/person/${id}/translations`);
  }

  async getPersonLatest(): Promise<types.TMDBPersonDetails> {
    return await this.get<types.TMDBPersonDetails>('/person/latest');
  }

  async getPersonPopular(options?: types.TMDBLanguageOption & types.TMDBPageOption): Promise<types.TMDBPopularPeople> {
    return await this.get<types.TMDBPopularPeople>('/person/popular', options);
  }

  async getMovieDetails<T extends types.TMDBAppendToResponseMovieKey[] | undefined>(
    id: number,
    appendToResponse?: T,
    language?: types.TMDBAvailableLanguage
  ) {
    const options = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      language: language
    };

    return await this.get<types.TMDBAppendToResponse<types.TMDBMovieDetails, T, 'movie'>>(`/movie/${id}`, options);
  }

  async getMovieAlternativeTitles(id: number): Promise<types.TMDBAlternativeTitles> {
    return await this.get<types.TMDBAlternativeTitles>(`/movie/${id}/alternative_titles`);
  }

  async getMovieChanges(
    id: number,
    options?: types.TMDBChangeOption
  ): Promise<types.TMDBChanges<types.TMDBMovieChangeValue>> {
    return await this.get<types.TMDBChanges<types.TMDBMovieChangeValue>>(`/movie/${id}/changes`, options);
  }

  async getMovieCredits(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBCredits> {
    return await this.get<types.TMDBCredits>(`/movie/${id}/credits`, options);
  }

  async getMovieExternalIds(id: number): Promise<types.TMDBExternalIds> {
    return await this.get<types.TMDBExternalIds>(`/movie/${id}/external_ids`);
  }

  async getMovieImages(id: number, options?: types.TMDBMoviesImageSearchOptions): Promise<types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    return await this.get<types.TMDBImages>(`/movie/${id}/images`, computedOptions);
  }

  async getMovieKeywords(id: number): Promise<types.TMDBKeywords> {
    return await this.get<types.TMDBKeywords>(`/movie/${id}/keywords`);
  }

  async getMovieLists(
    id: number,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBMovieLists> {
    return await this.get<types.TMDBMovieLists>(`/movie/${id}/lists`, options);
  }

  async getMovieRecommendations(
    id: number,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBRecommendations> {
    return await this.get<types.TMDBRecommendations>(`/movie/${id}/recommendations`, options);
  }

  async getMovieReleaseDates(id: number): Promise<types.TMDBReleaseDates> {
    return await this.get<types.TMDBReleaseDates>(`/movie/${id}/release_dates`);
  }

  async getMovieReviews(
    id: number,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBReviews> {
    return await this.get<types.TMDBReviews>(`/movie/${id}/reviews`, options);
  }

  async getSimilarMovie(
    id: number,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBSimilarMovies> {
    return await this.get<types.TMDBSimilarMovies>(`/movie/${id}/similar`, options);
  }

  async getMovieTranslations(id: number): Promise<types.TMDBTranslations> {
    return await this.get<types.TMDBTranslations>(`/movie/${id}/translations`);
  }

  async getMovieVideos(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBVideos> {
    return await this.get<types.TMDBVideos>(`/movie/${id}/videos`, options);
  }

  async getMovieWatchProviders(id: number): Promise<types.TMDBWatchProviders> {
    return await this.get<types.TMDBWatchProviders>(`/movie/${id}/watch/providers`);
  }

  async getLatestMovie(): Promise<types.TMDBLatestMovie> {
    return await this.get<types.TMDBLatestMovie>('/movie/latest');
  }

  async getNowPlayingMovies(
    options?: types.TMDBPageOption & types.TMDBLanguageOption & types.TMDBRegionOption
  ): Promise<types.TMDBMoviesPlayingNow> {
    return await this.get<types.TMDBMoviesPlayingNow>('/movie/now_playing', options);
  }

  async getPopularMovies(options?: types.TMDBLanguageOption & types.TMDBPageOption): Promise<types.TMDBPopularMovies> {
    return await this.get<types.TMDBPopularMovies>('/movie/popular', options);
  }

  async getTopRatedMovies(
    options?: types.TMDBPageOption & types.TMDBLanguageOption & types.TMDBRegionOption
  ): Promise<types.TMDBTopRatedMovies> {
    return await this.get<types.TMDBTopRatedMovies>('/movie/top_rated', options);
  }

  async getUpcomingMovies(
    options?: types.TMDBPageOption & types.TMDBLanguageOption & types.TMDBRegionOption
  ): Promise<types.TMDBUpcomingMovies> {
    return await this.get<types.TMDBUpcomingMovies>('/movie/upcoming', options);
  }

  async getTvEpisodeDetails<T extends types.TMDBAppendToResponseTvEpisodeKey[] | undefined>(
    episodeSelection: types.TMDBEpisodeSelection,
    appendToResponse?: T,
    options?: types.TMDBLanguageOption
  ) {
    const combinedOptions = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      ...options
    };

    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}`;
    return await this.get<types.TMDBAppendToResponse<Omit<types.TMDBEpisode, 'show_id'>, T, 'tvEpisode'>>(
      path,
      combinedOptions
    );
  }

  async getTvEpisodeChanges(
    episodeID: number,
    options?: types.TMDBChangeOption
  ): Promise<types.TMDBChanges<types.TMDBTvEpisodeChangeValue>> {
    return await this.get<types.TMDBChanges<types.TMDBTvEpisodeChangeValue>>(
      `/tv/episode/${episodeID}/changes`,
      options
    );
  }

  async getTvEpisodeCredits(
    episodeSelection: types.TMDBEpisodeSelection,
    options?: types.TMDBLanguageOption
  ): Promise<types.TMDBTvEpisodeCredit> {
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/credits`;
    return await this.get<types.TMDBTvEpisodeCredit>(path, options);
  }

  async getTvEpisodeExternalIds(episodeSelection: types.TMDBEpisodeSelection): Promise<types.TMDBExternalIds> {
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/external_ids`;
    return await this.get<types.TMDBExternalIds>(path);
  }

  async getTvEpisodeImages(
    episodeSelection: types.TMDBEpisodeSelection,
    options?: types.TMDBTvEpisodeImageSearchOptions
  ): Promise<types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/images`;
    return await this.get<types.TMDBImages>(path, computedOptions);
  }

  async getTvEpisodeTranslations(
    episodeSelection: types.TMDBEpisodeSelection
  ): Promise<types.TMDBTvEpisodeTranslations> {
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/translations`;
    return await this.get<types.TMDBTvEpisodeTranslations>(path);
  }

  async getTvEpisodeVideos(
    episodeSelection: types.TMDBEpisodeSelection,
    options?: types.TMDBTvEpisodeVideoSearchOptions
  ): Promise<types.TMDBVideos> {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/videos`;
    return await this.get<types.TMDBVideos>(path, computedOptions);
  }

  async getTvSeasonDetails<T extends types.TMDBAppendToResponseTvSeasonKey[] | undefined>(
    seasonSelection: types.TMDBSeasonSelection,
    appendToResponse?: T,
    options?: types.TMDBLanguageOption
  ) {
    const combinedOptions = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      ...options
    };

    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}`;
    return await this.get<types.TMDBAppendToResponse<types.TMDBSeasonDetails, T, 'tvSeason'>>(path, combinedOptions);
  }

  async getTvSeasonAggregateCredits(
    seasonSelection: types.TMDBSeasonSelection,
    options?: types.TMDBLanguageOption
  ): Promise<types.TMDBAggregateCredits> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/aggregate_credits`;
    return await this.get<types.TMDBAggregateCredits>(path, options);
  }

  async getTvSeasonChanges(
    seasonId: number,
    options?: types.TMDBChangeOption
  ): Promise<types.TMDBChanges<types.TMDBTvSeasonChangeValue>> {
    return await this.get<types.TMDBChanges<types.TMDBTvSeasonChangeValue>>(`/tv/season/${seasonId}/changes`, options);
  }

  async getTvSeasonCredits(
    seasonSelection: types.TMDBSeasonSelection,
    options?: types.TMDBLanguageOption
  ): Promise<types.TMDBCredits> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/credits`;
    return await this.get<types.TMDBCredits>(path, options);
  }

  async getTvSeasonExternalIds(
    seasonSelection: types.TMDBSeasonSelection,
    options?: types.TMDBLanguageOption
  ): Promise<types.TMDBExternalIds> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/external_ids`;
    return await this.get<types.TMDBExternalIds>(path, options);
  }

  async getTvSeasonImages(
    seasonSelection: types.TMDBSeasonSelection,
    options?: types.TMDBTvSeasonImageSearchOptions
  ): Promise<types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/images`;
    return await this.get<types.TMDBImages>(path, computedOptions);
  }

  async getTvSeasonVideos(
    seasonSelection: types.TMDBSeasonSelection,
    options?: types.TMDBTvSeasonVideoSearchOptions
  ): Promise<types.TMDBVideos> {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/videos`;
    return await this.get<types.TMDBVideos>(path, computedOptions);
  }

  async getTvSeasonTranslations(
    seasonSelection: types.TMDBSeasonSelection,
    options?: types.TMDBLanguageOption
  ): Promise<types.TMDBTranslations> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/translations`;
    return await this.get<types.TMDBTranslations>(path, options);
  }

  async getTvShowDetails<T extends types.TMDBAppendToResponseTvKey[] | undefined>(
    id: number,
    appendToResponse?: T,
    language?: string
  ) {
    const options = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      language: language
    };
    return await this.get<types.TMDBAppendToResponse<types.TMDBTvShowDetails, T, 'tvShow'>>(`/tv/${id}`, options);
  }

  async getTvShowAlternativeTitles(id: number): Promise<types.TMDBAlternativeTitles> {
    return await this.get<types.TMDBAlternativeTitles>(`/tv/${id}/alternative_titles`);
  }

  async getTvShowChanges(
    id: number,
    options?: types.TMDBChangeOption
  ): Promise<types.TMDBChanges<types.TMDBTvShowChangeValue>> {
    return await this.get<types.TMDBChanges<types.TMDBTvShowChangeValue>>(`/tv/${id}/changes`, options);
  }

  async getTvShowContentRatings(id: number): Promise<types.TMDBContentRatings> {
    return await this.get<types.TMDBContentRatings>(`/tv/${id}/content_ratings`);
  }

  async getTvShowAggregateCredits(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBAggregateCredits> {
    return await this.get<types.TMDBAggregateCredits>(`/tv/${id}/aggregate_credits`, options);
  }

  async getTvShowCredits(id: number, options?: types.TMDBLanguageOption): Promise<types.TMDBCredits> {
    return await this.get<types.TMDBCredits>(`/tv/${id}/credits`, options);
  }

  async getTvShowSeason(tvId: number, seasonNumber: number): Promise<types.TMDBSeasonDetails> {
    return await this.get<types.TMDBSeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`);
  }

  async getTvShowEpisodeGroups(id: number): Promise<types.TMDBEpisodeGroups> {
    return await this.get<types.TMDBEpisodeGroups>(`/tv/${id}/episode_groups`);
  }

  async getTvShowExternalIds(id: number): Promise<types.TMDBExternalIds> {
    return await this.get<types.TMDBExternalIds>(`/tv/${id}/external_ids`);
  }

  async getTvShowImages(id: number, options?: types.TMDBTvShowImageOptions): Promise<types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    return await this.get<types.TMDBImages>(`/tv/${id}/images`, computedOptions);
  }

  async getTvShowKeywords(id: number): Promise<types.TMDBKeywords> {
    return await this.get<types.TMDBKeywords>(`/tv/${id}/keywords`);
  }

  async getTvShowRecommendations(
    id: number,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBRecommendations> {
    return await this.get<types.TMDBRecommendations>(`/tv/${id}/recommendations`, options);
  }

  async getTvShowReviews(
    id: number,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBReviews> {
    return await this.get<types.TMDBReviews>(`/tv/${id}/reviews`, options);
  }

  async getTvShowScreenedTheatrically(id: number): Promise<types.TMDBScreenedTheatrically> {
    return await this.get<types.TMDBScreenedTheatrically>(`/tv/${id}/screened_theatrically`);
  }

  async getTvShowSimilar(
    id: number,
    options?: types.TMDBLanguageOption & types.TMDBPageOption
  ): Promise<types.TMDBSimilarTvShows> {
    return await this.get<types.TMDBSimilarTvShows>(`/tv/${id}/similar`, options);
  }

  async getTvShowTranslations(id: number): Promise<types.TMDBTranslations> {
    return await this.get<types.TMDBTranslations>(`/tv/${id}/translations`);
  }

  async getTvShowVideos(id: number, options?: types.TMDBTvShowVideoOptions): Promise<types.TMDBVideos> {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language
    };
    return await this.get<types.TMDBVideos>(`/tv/${id}/videos`, computedOptions);
  }

  async getTvShowWatchProviders(id: number): Promise<types.TMDBWatchProviders> {
    return await this.get<types.TMDBWatchProviders>(`/tv/${id}/watch/providers`);
  }

  async getLatestTvShow(): Promise<types.TMDBLatestTvShows> {
    return await this.get<types.TMDBLatestTvShows>('/tv/latest');
  }

  async getTvShowsOnTheAir(
    options?: types.TMDBPageOption & types.TMDBLanguageOption & types.TMDBTimezoneOption
  ): Promise<types.TMDBOnTheAir> {
    return await this.get<types.TMDBOnTheAir>('/tv/on_the_air', options);
  }

  async getTvShowsAiringToday(
    options?: types.TMDBPageOption & types.TMDBLanguageOption & types.TMDBTimezoneOption
  ): Promise<types.TMDBTvShowsAiringToday> {
    return await this.get<types.TMDBTvShowsAiringToday>('/tv/airing_today', options);
  }

  async getPopularTvShows(
    options?: types.TMDBPageOption & types.TMDBLanguageOption
  ): Promise<types.TMDBPopularTvShows> {
    return await this.get<types.TMDBPopularTvShows>('/tv/popular', options);
  }

  async getTopRatedTvShows(
    options?: types.TMDBPageOption & types.TMDBLanguageOption
  ): Promise<types.TMDBTopRatedTvShows> {
    return await this.get<types.TMDBTopRatedTvShows>('/tv/top_rated', options);
  }
}

export default TMDBService;
