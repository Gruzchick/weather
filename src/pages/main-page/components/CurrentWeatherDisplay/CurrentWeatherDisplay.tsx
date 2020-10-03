import { Paper } from '@material-ui/core';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { CelsiusIcon } from '../../../../common/components/celsius-icon';
import { geolocationSelector } from '../../../../store/geolocation';
import {
  WEATHER_STALE_PERIOD_IN_MINUTES,
  WEATHER_UPDATE_TIMEOUT_IN_MINUTES,
} from './constants';
import { helpers } from './helpers';
import {
  messageCSS,
  tempCSS,
  tempIconCSS,
  tempValueCSS,
  wrapperCSS,
} from './styles';

export const CurrentWeatherDisplay: FC = () => {
  const { region, place, wasGeolocationBootstrapped } = useSelector(
    geolocationSelector,
  );

  const { data, isIdle, isSuccess, isLoading } = useQuery(
    ['currentWeather', place?.lat, place?.lng],
    helpers,
    {
      enabled: Boolean(place),
      refetchInterval: 1000 * 60 * WEATHER_UPDATE_TIMEOUT_IN_MINUTES,
      staleTime: 1000 * 60 * WEATHER_STALE_PERIOD_IN_MINUTES,
    },
  );

  let content = <div css={messageCSS}>Loading...</div>;
  // consider wasGeolocationBootstrapped to avoid show prompt for select
  if (isIdle && wasGeolocationBootstrapped) {
    if (!region) {
      content = <div css={messageCSS}>Please select region</div>;
    } else {
      content = <div css={messageCSS}>Please select place</div>;
    }
  }
  if (isLoading) {
    content = <div css={messageCSS}>Loading...</div>;
  }
  if (isSuccess) {
    content = (
      <>
        <div css={tempValueCSS}>{data?.temp}</div>
        <CelsiusIcon css={tempIconCSS} />
      </>
    );
  }

  return (
    <Paper css={wrapperCSS}>
      <div css={tempCSS}>{content}</div>
    </Paper>
  );
};
