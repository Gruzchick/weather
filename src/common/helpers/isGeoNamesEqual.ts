import { Geoname } from '../../api/geo-names-api/types';

export function isGeoNamesEqual(first: Geoname, second: Geoname): boolean {
  return first.geonameId === second.geonameId;
}
