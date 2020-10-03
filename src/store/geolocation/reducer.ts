import { createReducer } from '@reduxjs/toolkit';

import {
  selectCountryAction,
  selectPlaceAction,
  selectRegionAction,
} from './actions';
import { getBootstrapGeolocation } from './thunks';
import { GeolocationState } from './types';

const geolocationInitialState: GeolocationState = {
  country: null,
  region: null,
  place: null,
  wasGeolocationBootstrapped: false,
};

export const reducer = createReducer(geolocationInitialState, (builder) => {
  builder.addCase(selectCountryAction, (state, { payload }) => {
    const { country } = payload;

    state.country = country;
    state.region = null;
    state.place = null;
  });
  builder.addCase(selectRegionAction, (state, { payload }) => {
    const { region } = payload;

    state.region = region;
    state.place = null;
  });
  builder.addCase(selectPlaceAction, (state, { payload }) => {
    const { place } = payload;

    state.place = place;
  });
  builder.addCase(getBootstrapGeolocation.fulfilled, (state, { payload }) => {
    const { geonames } = payload;

    const [, , country, region, place] = geonames;

    state.country = country;
    state.region = region;
    state.place = place;
    state.wasGeolocationBootstrapped = true;
  });
});
