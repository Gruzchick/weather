import { Country, Place, Region } from '../../api/geo-names-api/types';

export type GeolocationState = {
  country: Country | null;
  region: Region | null;
  place: Place | null;
  wasGeolocationBootstrapped: boolean;
};

export type SelectCountryPayload = {
  country: Country;
};

export type SelectRegionPayload = {
  region: Region;
};

export type SelectPlacePayload = {
  place: Place;
};
