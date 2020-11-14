export interface CountryResponse {
  data: Country[];
}

export interface CountryDetailResponse {
  data: CountryDetail;
}

export interface Country {
  name: string;
  code: string;
}

export interface CountryDetail extends Country {
  flagImageUri: string;
  numRegions: number;
  currencyCodes: string[];
  wikiDataId: string;
}