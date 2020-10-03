import axios, { AxiosResponse } from 'axios';

import { createGetApiUrl } from '../../common/helpers/createGetApiUrl';
import {
  API_FIND_PLACE_BY_COORDINATES_PATH,
  API_HIERARCHY_PATH,
  API_KEY,
  API_TEXT_SEARCH_PATH,
  API_URL,
} from './constants';
import {
  FeatureCodes,
  GetCountriesResponse,
  GetPlaceByCoordinatesRequest,
  GetPlaceByCoordinatesResponse,
  GetPlaceHierarchyByPlaceId,
  GetPlacesRequest,
  GetPlacesResponse,
  GetRegionsByCountryCodeResponse,
} from './types';

const getApiUrl = createGetApiUrl(API_URL);

class GeoNamesApi {
  async getCountries(): Promise<AxiosResponse<GetCountriesResponse>> {
    return axios.get<GetCountriesResponse>(getApiUrl(API_TEXT_SEARCH_PATH), {
      params: {
        username: API_KEY,
        featureCode: FeatureCodes.Country,
        type: 'json',
      },
    });
  }

  async getRegionsByCountryCode(
    countryCode: string,
  ): Promise<AxiosResponse<GetRegionsByCountryCodeResponse>> {
    return axios.get<GetRegionsByCountryCodeResponse>(
      getApiUrl(API_TEXT_SEARCH_PATH),
      {
        params: {
          country: countryCode,
          featureCode: FeatureCodes.Region,
          username: API_KEY,
          type: 'json',
        },
      },
    );
  }

  async getPlaces(
    request: GetPlacesRequest,
  ): Promise<AxiosResponse<GetPlacesResponse>> {
    const { country, query, region } = request;

    return axios.get<GetPlacesResponse>(getApiUrl(API_TEXT_SEARCH_PATH), {
      params: {
        country,
        featureCode: FeatureCodes.PopulatedPlace,
        name_startsWith: query,
        adminCode1: region,
        username: API_KEY,
        type: 'json',
        maxRows: 50,
      },
    });
  }

  async getPlaceByCoordinates(
    request: GetPlaceByCoordinatesRequest,
  ): Promise<AxiosResponse<GetPlaceByCoordinatesResponse>> {
    const { latitude, longitude } = request;
    return axios.get<GetPlaceByCoordinatesResponse>(
      getApiUrl(API_FIND_PLACE_BY_COORDINATES_PATH),
      {
        params: {
          lat: latitude,
          lng: longitude,
          featureCode:
            FeatureCodes.PopulatedPlaceFirstOrderAdministrativeDivision,
          username: API_KEY,
          type: 'json',
        },
      },
    );
  }

  async getPlaceHierarchyByPlaceId(
    placeId: string,
  ): Promise<AxiosResponse<GetPlaceHierarchyByPlaceId>> {
    return axios.get<GetPlaceHierarchyByPlaceId>(
      getApiUrl(API_HIERARCHY_PATH),
      {
        params: {
          geonameId: placeId,
          username: API_KEY,
          type: 'json',
          featureCode:
            FeatureCodes.PopulatedPlaceFirstOrderAdministrativeDivision,
        },
      },
    );
  }
}

export const geoNamesApi = new GeoNamesApi();
