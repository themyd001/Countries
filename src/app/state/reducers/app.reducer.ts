import { createReducer, on } from '@ngrx/store';

import { AppModel } from '../models/app.model';
import * as appActions from '../actions/app.actions';
import * as homeActions from '../actions/home.actions';
import * as moreActions from '../actions/more.actions';
export const initialState: AppModel = {
  is_light: true,
  visited_countries: [],
  region: '',
  search: '',
  is_loading: false,
  is_error: '',
  now_country: '',
};

export const appReducer = createReducer(
  initialState,
  on(appActions.changeTheme, (state) => {
    return {
      ...state,
      is_light: !state.is_light,
    };
  }),
  on(homeActions.reloadPage, (state) => {
    return {
      ...state,
      is_error: '',
    };
  }),
  on(homeActions.getApiCountries, (state) => {
    return {
      ...state,
      is_loading: true,
    };
  }),
  on(homeActions.saveCountriesAndRegions, (state) => {
    return {
      ...state,
      is_loading: false,
    };
  }),
  on(homeActions.FailApiCountries, (state, { error }) => {
    return {
      ...state,
      is_loading: false,
      is_error: error.message,
    };
  }),
  on(homeActions.filterCountriesRegion, (state, { region }) => {
    return {
      ...state,
      region: region,
    };
  }),
  on(homeActions.filterCountriesSearch, (state, { search }) => {
    return {
      ...state,
      search: search,
    };
  }),
  on(moreActions.addNowCountry, (state, { id }) => {
    return {
      ...state,
      now_country: id,
    };
  }),
  on(moreActions.addVisitedCountries, (state, { country }) => {
    if (state.visited_countries.includes(country.flag)) {
      return {
        ...state,
        visited_countries: [
          country.flag,
          ...state.visited_countries.filter((v) => v !== country.flag),
        ],
      };
    }
    return {
      ...state,
      visited_countries: [country.flag, ...state.visited_countries],
    };
  })
);
