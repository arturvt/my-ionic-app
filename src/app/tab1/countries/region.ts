export interface Region {
  countryCode: string;
  name: string;
  isoCode: string;
  fipsCode: string;
  wikiDataId: string;
}

export interface RegionFull extends Region {
  capital: string;
  numCities: number;
}

export interface RegionRequest {
  regions: RegionFull[];
  id: string;
}