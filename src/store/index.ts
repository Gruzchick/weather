/*
eslint-disable
@typescript-eslint/no-unsafe-assignment,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-var-requires,
@typescript-eslint/no-unsafe-call
*/

import { StoreType } from './configureAppStore.prod';

const store =
  process.env.NODE_ENV === 'development'
    ? require('./configureAppStore.dev.ts').default
    : require('./configureAppStore.prod.ts').default;

export default store as StoreType;
