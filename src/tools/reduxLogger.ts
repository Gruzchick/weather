import { createLogger } from 'redux-logger';

export const reduxLogger = createLogger({
  collapsed: true,
  diff: true,
});
