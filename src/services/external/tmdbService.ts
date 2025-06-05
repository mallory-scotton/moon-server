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

  async searchCompanies(options: types.TMDBSearchOptions): Promise<types.TMDBSearch<types.TMDBCompany>> {
    return await this.get<types.TMDBSearch<types.TMDBCompany>>('/search/company', options);
  }

  async searchCollections(options: types.TMDBSearchOptions): Promise<types.TMDBSearch<types.TMDBCollection>> {
    return await this.get<types.TMDBSearch<types.TMDBCollection>>('/search/collection', options);
  }

  async searchKeywords(options: types.TMDBSearchOptions): Promise<types.TMDBSearch<{ id: string; name: string }>> {
    return await this.get<types.TMDBSearch<{ id: string; name: string }>>('/search/keyword', options);
  }

  async searchMovies(options: types.TMDBMovieSearchOptions): Promise<types.TMDBSearch<types.TMDBMovie>> {
    return await this.get<types.TMDBSearch<types.TMDBMovie>>('/search/movie', options);
  }

  async searchPeople(options: types.TMDBPeopleSearchOptions): Promise<types.TMDBSearch<types.TMDBPerson>> {
    return await this.get<types.TMDBSearch<types.TMDBPerson>>('/search/person', options);
  }

  async searchTvShows(options: types.TMDBTvSearchOptions): Promise<types.TMDBSearch<types.TMDBTV>> {
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

  async getMovieChanges(options?: types.TMDBChangeOption): Promise<types.TMDBMediaChanges> {
    return await this.get<types.TMDBMediaChanges>('/movie/changes', options);
  }

  async getTvShowChanges(options?: types.TMDBChangeOption): Promise<types.TMDBMediaChanges> {
    return await this.get<types.TMDBMediaChanges>('/tv/changes', options);
  }

  async getPersonChanges(options?: types.TMDBChangeOption): Promise<types.TMDBMediaChanges> {
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
}

export default TMDBService;
