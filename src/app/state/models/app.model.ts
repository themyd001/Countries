export interface AppModel {
  is_light: boolean;
  visited_countries: Array<string>;
  region: string;
  search: string;
  is_loading: boolean;
  is_error: string;
  now_country: string | null;
}
