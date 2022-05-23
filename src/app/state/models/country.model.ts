export interface CountryModel {
  id: string;
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  tld: string;
  currency: string;
  languages: string;
  borders: {
    id: string;
    name: string;
  }[];
}
