import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppModel } from '../models/app.model';

export const getState = createFeatureSelector<AppModel>('app');

export const getTheme = createSelector(getState, (state) => state.is_light);

export const getRegion = createSelector(getState, (state) => state.region);

export const getSearch = createSelector(getState, (state) => state.search);

export const getLoading = createSelector(getState, (state) => state.is_loading);

export const getNowCountry = createSelector(
  getState,
  (state) => state.now_country
);

export const getErrorMessage = createSelector(
  getState,
  (state) => state.is_error
);

export const getVisitedCountries = createSelector(
  getState,
  (state) => state.visited_countries
);
