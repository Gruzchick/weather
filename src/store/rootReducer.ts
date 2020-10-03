import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { history } from '../common/helpers/history';
import { geolocationReducer } from './geolocation';

export const rootReducer = combineReducers({
  router: connectRouter(history),
  geolocation: geolocationReducer,
});
