export type Geoname = {
  adminCode1: string;
  lng: string;
  geonameId: number;
  toponymName: string;
  countryId: string;
  fcl: string;
  population: number;
  countryCode: string;
  name: string;
  fclName: string;
  countryName: string;
  fcodeName: string;
  adminName1: string;
  lat: string;
  fcode: string;
};

export enum FeatureCodes {
  Country = 'PCLI',
  Region = 'ADM1',
  PopulatedPlace = 'PPL',
  PopulatedPlaceFirstOrderAdministrativeDivision = 'PPLA',
}

export type Country = Geoname & {
  fcode: typeof FeatureCodes.Country;
};

export type GetCountriesResponse = {
  totalResultsCount: number;
  geonames: Country[];
};

export type Region = Geoname & {
  adminCodes1: { ISO3166_2: string };
  fcode: typeof FeatureCodes.Region;
};

export type GetRegionsByCountryCodeResponse = {
  totalResultsCount: number;
  geonames: Region[];
};

export type Place = Geoname & {
  fcl: typeof FeatureCodes.PopulatedPlace;
};

export type GetPlacesRequest = {
  country: string;
  region: string;
  query: string;
};

export type GetPlacesResponse = {
  totalResultsCount: number;
  geonames: Place[];
};

export type GetPlaceByCoordinatesRequest = {
  latitude: string | number;
  longitude: string | number;
};

export type GetPlaceByCoordinatesResponse = {
  geonames: Place[];
};

export type GetPlaceHierarchyByPlaceId = {
  geonames: [any, any, Country, Region, Place];
};
