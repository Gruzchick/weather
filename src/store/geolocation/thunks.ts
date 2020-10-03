import { createAsyncThunk } from '@reduxjs/toolkit';

import { geoNamesApi } from '../../api/geo-names-api';
import {
  Country,
  GetPlaceHierarchyByPlaceId,
  Place,
  Region,
} from '../../api/geo-names-api/types';
import { ipGeolocationApi } from '../../api/ip-geolocation-api';
import { createGetThunkActionType } from '../../common/helpers/createGetThunkActionType';
import { history } from '../../common/helpers/history';
import { isGeoNamesEqual } from '../../common/helpers/isGeoNamesEqual';
import { AppDispatch, GetState, RootState } from '../types';
import {
  selectCountryAction,
  selectPlaceAction,
  selectRegionAction,
} from './actions';
import { GEOLOCATION_ACTION_PREFIX } from './constants';

const getThunkActionType = createGetThunkActionType(GEOLOCATION_ACTION_PREFIX);

export const getBootstrapGeolocation = createAsyncThunk<
  GetPlaceHierarchyByPlaceId | { geonames: [] },
  void,
  { state: RootState; getState: GetState }
>(getThunkActionType('GET_BOOTSTRAP_GEO_LOCATION'), async (_, { getState }) => {
  const urlPath = getState().router.location.pathname;

  const placeId = urlPath.replace('/', '');

  if (placeId.length !== 0) {
    const { data } = await geoNamesApi.getPlaceHierarchyByPlaceId(placeId);
    return data;
  }

  const { data: coordinates } = await ipGeolocationApi.getCoordinatesByIP();

  const {
    data: { geonames },
  } = await geoNamesApi.getPlaceByCoordinates(coordinates);

  if (geonames.length === 0) {
    return { geonames: [] };
  }

  const geonameId = String(geonames[0].geonameId);

  const { data } = await geoNamesApi.getPlaceHierarchyByPlaceId(
    String(geonameId),
  );
  history.replace(`/${geonameId}`);
  return data;
});

export const selectCountryThunk = (country: Country) => (
  dispatch: AppDispatch,
  getState: GetState,
): void => {
  const {
    geolocation: { country: countryFromState },
  } = getState();

  if (countryFromState !== null && isGeoNamesEqual(countryFromState, country)) {
    return;
  }
  history.push('');
  dispatch(selectCountryAction({ country }));
};

export const selectRegionThunk = (region: Region) => (
  dispatch: AppDispatch,
  getState: GetState,
): void => {
  const {
    geolocation: { region: regionFromState },
  } = getState();
  if (regionFromState !== null && isGeoNamesEqual(regionFromState, region)) {
    return;
  }
  history.push('');
  dispatch(selectRegionAction({ region }));
};

export const selectPlaceThunk = (place: Place) => (
  dispatch: AppDispatch,
  getState: GetState,
): void => {
  const {
    geolocation: { place: placeFromState },
  } = getState();
  if (placeFromState !== null && isGeoNamesEqual(placeFromState, place)) {
    return;
  }
  history.push(`/${place.geonameId}`);
  dispatch(selectPlaceAction({ place }));
};
