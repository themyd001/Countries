import { ApiModel } from './../models/api.model';
import { createAction, props } from '@ngrx/store';

export const startPage = createAction('[Home Comp] Start Page');

export const reloadPage = createAction('[Home Comp] Reload Page');

export const getApiCountries = createAction('[Home Comp] Get Api Countries');

export const LoadApiCountries = createAction(
  '[Home Comp] Loaded Api Countries',
  props<{ countriesApi: Array<any> }>()
);

export const saveCountriesAndRegions = createAction(
  '[Home Comp] Save Api Countries & Regions',
  props<{ data: ApiModel }>()
);

export const filterCountriesRegion = createAction(
  '[Home Comp] Filter Country Region',
  props<{ region: string }>()
);

export const filterCountriesSearch = createAction(
  '[Home Comp] Filter Country Search',
  props<{ search: string }>()
);

export const FailApiCountries = createAction(
  '[Home Comp] Failure Api Countries',
  props<{
    error: Error;
  }>()
);

export const pageLoaded = createAction('[Home Comp] Start Page Loaded');
