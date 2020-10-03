import store from './configureAppStore.prod';
import { rootReducer } from './rootReducer';

export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type RootState = ReturnType<typeof rootReducer>;
