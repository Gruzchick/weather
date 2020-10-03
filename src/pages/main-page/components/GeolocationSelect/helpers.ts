import { geoNamesApi } from '../../../../api/geo-names-api';
import { Country, Region } from '../../../../api/geo-names-api/types';

export const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await geoNamesApi.getCountries();
  return data.geonames;
};

export const fetchRegions = async (
  key: string,
  countryCode: string,
): Promise<Region[]> => {
  const { data } = await geoNamesApi.getRegionsByCountryCode(countryCode);
  return data.geonames;
};
