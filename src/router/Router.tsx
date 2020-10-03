import React, { FC } from 'react';
import { Route } from 'react-router';

import { MainPage } from '../pages/main-page';

export const Router: FC = () => {
  return (
    <Route exact path={['/', '/:placeId']}>
      <MainPage />
    </Route>
  );
};
