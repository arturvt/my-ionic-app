import { Region } from './region';

export interface Country {
  code: string;
  name: string;
}

export interface CountryDetail extends Country {
  capital: string;
  wikiId: string;
  population: number;
  flag: string;
  regions: Region[];
  currency: Currency;
  location: CountryLocation;
}

export interface CountryLocation {
  location: string;
  lat: string;
  lon: string;
  geo: string;
  map: string[];
}

interface Currency {
  name: string;
  code: string;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface CountryRequest extends PageableRequest{
  content: CountryDetail[];
}

export interface PageableRequest {
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  size: number;
  last: boolean;
}
