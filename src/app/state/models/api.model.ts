import { CountryModel } from './country.model';

export interface ApiModel {
  countries: CountryModel[];
  regions: Array<string>;
}
