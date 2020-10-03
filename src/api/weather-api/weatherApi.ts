import axios, { AxiosResponse } from 'axios';

import { createGetApiUrl } from '../../common/helpers/createGetApiUrl';
import { API_KEY, API_URL } from './constants';
import { GetCurrentWeatherRequest, GetCurrentWeatherResponse } from './types';

const getApiUrl = createGetApiUrl(API_URL);

class WeatherApi {
  async getCurrentWeather(
    request: GetCurrentWeatherRequest,
  ): Promise<AxiosResponse<GetCurrentWeatherResponse>> {
    return axios.get<GetCurrentWeatherResponse>(getApiUrl(), {
      params: {
        key: API_KEY,
        ...request,
      },
    });
  }
}

export const weatherApi = new WeatherApi();
