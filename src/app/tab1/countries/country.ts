export interface Country {
  code: string;
  name: string;
  currencyCodes: string[];
  wikiDataId: string;
}

export interface CountryDetail extends Country {
  capital: string;
  numRegions: number;
  wikiDataId: string;
  flagImageUri: string;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface CountryRequest extends PageableRequest{
  content: Country[];

}

export interface PageableRequest {
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  size: number;
  last: boolean;
}
