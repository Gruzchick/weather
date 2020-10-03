export type CurrentWeather = {
  temp: number;
};

export type GetCurrentWeatherRequest = {
  lat: string;
  lon: string;
};

export type GetCurrentWeatherResponse = {
  data: [CurrentWeather];
  count: number;
};
