import { createAction, props } from '@ngrx/store';
import { CountryModel } from '../models/country.model';

export const startPage = createAction('[More Comp] Start Page');

export const reloadPage = createAction('[More Comp] Reload Page');

export const addNowCountry = createAction(
  '[More Comp] Add Now Region',
  props<{ id: string | null }>()
);

export const addVisitedCountries = createAction(
  '[More Comp] Add Visited Countries',
  props<{ country: CountryModel }>()
);
