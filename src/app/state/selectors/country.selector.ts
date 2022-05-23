import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ApiModel } from './../models/api.model';
import * as appSelector from '../../state/selectors/app.selector';

export const getCountriesRaw = createFeatureSelector<ApiModel>('countries');

export const getCountries = createSelector(
  getCountriesRaw,
  (state) => state.countries
);

export const getRegions = createSelector(
  getCountriesRaw,
  (state) => state.regions
);

export const getFilteredCountries = createSelector(
  getCountries,
  appSelector.getRegion,
  appSelector.getSearch,
  (countries, region, search) => {
    return countries.filter((c) => {
      let ans = true;
      if (region.trim() !== '') {
        if (c.region !== region) {
          ans = false;
        }
      }
      if (search.trim() !== '') {
        let reg_searc = new RegExp('.*' + search.trim() + '.*', 'i');
        if (!reg_searc.test(c.name)) {
          ans = false;
        }
      }
      return ans;
    });
  }
);

export const getNowCountryDetails = createSelector(
  getCountries,
  appSelector.getNowCountry,
  (countries, country_id) => {
    return countries.filter((c) => c.id === country_id);
  }
);
