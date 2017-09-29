import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import screenTracking from './ScreenTracking';
import loggerMiddleware from './middleware/loggerMiddleware';

// define store middlewares as an array
export default [
  screenTracking,
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware
];
