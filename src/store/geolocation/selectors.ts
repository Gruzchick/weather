import { RootState } from '../types';
import { GeolocationState } from './types';

export const geolocationSelector = (state: RootState): GeolocationState => {
  return state.geolocation;
};
