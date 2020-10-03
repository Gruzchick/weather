import { Grid } from '@material-ui/core';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Select, { ValueType } from 'react-select';
import AsyncSelect from 'react-select/async';

import { geoNamesApi } from '../../../../api/geo-names-api';
import {
  Country,
  Geoname,
  Place,
  Region,
} from '../../../../api/geo-names-api/types';
import { usePrevious } from '../../../../common/hooks/usePrevious';
import {
  geolocationSelector,
  selectCountryThunk,
  selectPlaceThunk,
  selectRegionThunk,
} from '../../../../store/geolocation';
import { fetchCountries, fetchRegions } from './helpers';
import { wrapperCSS } from './styles';

export const GeolocationSelector: FC = () => {
  const dispatch = useDispatch();

  const regionSelect = useRef<Select<Region>>(null);
  const placeSelect = useRef<AsyncSelect<Place>>(null);

  const { country, region, place, wasGeolocationBootstrapped } = useSelector(
    geolocationSelector,
  );

  const previousWasGeolocationBootstrapped = usePrevious(
    wasGeolocationBootstrapped,
  );
  const previousRegion = usePrevious(region);

  const { data: countries, isLoading: isCountriesLoading } = useQuery(
    ['countries'],
    fetchCountries,
  );

  const { data: regions, isLoading: isRegionsLoading } = useQuery(
    ['regions', country?.countryCode],
    fetchRegions,
    {
      enabled: Boolean(country?.countryCode),
    },
  );

  const loadPlaces = useCallback(
    async (input: string) => {
      if (country !== null && region !== null) {
        const { data } = await geoNamesApi.getPlaces({
          country: country.countryCode,
          region: region.adminCode1,
          query: input,
        });
        return data.geonames;
      }
      return [];
    },
    [country, region],
  );

  const handleChangeCountry = (value: ValueType<Country>): void => {
    dispatch(selectCountryThunk(value as Country));
    if (regionSelect.current !== null) {
      regionSelect.current.focus();
    }
  };

  const handleChangeRegion = (value: ValueType<Region>): void => {
    dispatch(selectRegionThunk(value as Region));
    if (placeSelect.current !== null) {
      placeSelect.current.focus();
    }
  };

  useEffect(() => {
    // workaround for the case when disabled place select can not be focused
    if (
      previousWasGeolocationBootstrapped &&
      previousRegion === null &&
      region !== null &&
      placeSelect.current !== null
    ) {
      placeSelect.current.focus();
    }
  }, [previousWasGeolocationBootstrapped, previousRegion, region]);

  const handleChangePlace = (value: ValueType<Place>): void => {
    dispatch(selectPlaceThunk(value as Place));
  };

  const getOptionValue = useCallback(
    (option: Geoname) => String(option.geonameId),
    [],
  );

  const getOptionLabel = useCallback((option: Geoname) => option.name, []);

  return (
    <Grid container css={wrapperCSS}>
      <Grid item md={4}>
        <Select
          value={country}
          options={countries}
          onChange={handleChangeCountry}
          isLoading={isCountriesLoading}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isDisabled={!wasGeolocationBootstrapped} // Disable only while a bootstrapping
        />
      </Grid>
      <Grid item md={4}>
        <Select
          value={region}
          options={regions}
          onChange={handleChangeRegion}
          isLoading={isRegionsLoading}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isDisabled={!country} // Disable only while a bootstrapping
          ref={regionSelect}
          openMenuOnFocus
        />
      </Grid>
      <Grid item md={4}>
        <AsyncSelect
          value={place}
          loadOptions={loadPlaces}
          onChange={handleChangePlace}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          placeholder={region ? 'Start typing...' : ''}
          isDisabled={!region}
          ref={placeSelect}
          openMenuOnFocus
        />
      </Grid>
    </Grid>
  );
};
