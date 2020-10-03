/*
eslint-disable
@typescript-eslint/no-unsafe-assignment,
@typescript-eslint/no-var-requires,
@typescript-eslint/no-unsafe-call
*/

import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  const ReactRouter = require('react-router');
  const ReactQuery = require('react-query');
  whyDidYouRender(React, {
    logOwnerReasons: true,
    trackAllPureComponents: false,
    trackExtraHooks: [
      [ReactRedux, 'useSelector'],
      [ReactRouter, 'useParams'],
      [ReactQuery, 'useQuery'],
    ],
  });
}
