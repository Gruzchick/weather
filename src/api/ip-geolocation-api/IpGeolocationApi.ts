import axios, { AxiosResponse } from 'axios';

import { createGetApiUrl } from '../../common/helpers/createGetApiUrl';
import { API_KEY, API_URL } from './constants';
import { GetCoordinatesByIPResponse } from './types';

const getApiUrl = createGetApiUrl(API_URL);

class IpGeolocationApi {
  async getCoordinatesByIP(): Promise<
    AxiosResponse<GetCoordinatesByIPResponse>
  > {
    return axios.get<GetCoordinatesByIPResponse>(getApiUrl(), {
      params: { apiKey: API_KEY },
    });
  }
}

export const ipGeolocationApi = new IpGeolocationApi();
