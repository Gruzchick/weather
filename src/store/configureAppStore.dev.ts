import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

import { history } from '../common/helpers/history';
import { rootReducer } from './rootReducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}

const store = configureAppStore();

export default store;
