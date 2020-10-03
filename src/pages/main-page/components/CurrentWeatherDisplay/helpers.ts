import { weatherApi } from '../../../../api/weather-api';
import { CurrentWeather } from '../../../../api/weather-api/types';

export const helpers = async (
  key: string,
  lat: string,
  lon: string,
): Promise<CurrentWeather> => {
  const { data } = await weatherApi.getCurrentWeather({ lat, lon });
  const { data: dataFromResponseBody } = data;
  const [currentWeather] = dataFromResponseBody;
  return currentWeather;
};
