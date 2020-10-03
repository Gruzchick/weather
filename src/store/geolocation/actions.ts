import { createAction } from '@reduxjs/toolkit';

import { createGetActionType } from '../../common/helpers/createGetActionType';
import { GEOLOCATION_ACTION_PREFIX } from './constants';
import {
  SelectCountryPayload,
  SelectPlacePayload,
  SelectRegionPayload,
} from './types';

export const getActionType = createGetActionType(GEOLOCATION_ACTION_PREFIX);

export const selectCountryAction = createAction<SelectCountryPayload>(
  getActionType('SELECT_COUNTRY'),
);

export const selectRegionAction = createAction<SelectRegionPayload>(
  getActionType('SELECT_REGION'),
);

export const selectPlaceAction = createAction<SelectPlacePayload>(
  getActionType('SELECT_PLACE'),
);
