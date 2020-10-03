import { Container } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getBootstrapGeolocation } from '../../store/geolocation';
import { CurrentWeatherDisplay } from './components/CurrentWeatherDisplay';
import { GeolocationSelector } from './components/GeolocationSelect';
import { wrapperCSS } from './styles';

export const MainPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBootstrapGeolocation());
  }, [dispatch]);

  return (
    <Container maxWidth="md" css={wrapperCSS}>
      <CurrentWeatherDisplay />
      <GeolocationSelector />
    </Container>
  );
};
