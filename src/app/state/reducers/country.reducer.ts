import { ApiModel } from './../models/api.model';
import { createReducer, on } from '@ngrx/store';
import { saveCountriesAndRegions } from '../actions/home.actions';

export const initialState: ApiModel = {
  countries: [],
  regions: [],
};

export const CountryReducer = createReducer(
  initialState,
  on(saveCountriesAndRegions, (state, { data }) => {
    return {
      countries: data.countries,
      regions: data.regions,
    };
  })
);
