import { CountryApiService } from './../../services/country-api.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import * as homeActions from '../actions/home.actions';
import * as moreActions from '../actions/more.actions';
import { getCountries } from '../selectors/country.selector';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CountryEffects {
  constructor(
    private countryApi: CountryApiService,
    private actions$: Actions,
    private store: Store
  ) {}

  startHomePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.startPage, homeActions.reloadPage),
      concatLatestFrom((action) => this.store.select(getCountries)),
      map(([action, countries]) => {
        if (countries.length === 0) return homeActions.getApiCountries();
        return homeActions.pageLoaded();
      })
    )
  );

  startMorePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moreActions.startPage, moreActions.reloadPage),
      concatLatestFrom((action) => this.store.select(getCountries)),
      map(([action, countries]) => {
        if (countries.length === 0) return homeActions.getApiCountries();
        return homeActions.pageLoaded();
      })
    )
  );

  getApiCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.getApiCountries),
      mergeMap(() =>
        this.countryApi.getApiCountries().pipe(
          map((countriesApi) => homeActions.LoadApiCountries({ countriesApi })),
          catchError((error) => of(homeActions.FailApiCountries({ error })))
        )
      )
    )
  );

  LoadApiCountries$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(homeActions.LoadApiCountries),
        map(({ countriesApi }) => {
          let countries = countriesApi.map((c) => {
            return {
              id: c.cca3,
              name: c.name.official,
              flag: c.flags.svg,
              capital: c.capital,
              region: c.region,
              population: c.population.toLocaleString(),
              tld: c.hasOwnProperty('tld') ? c.tld.join(', ') : '',
              currency: c.hasOwnProperty('currencies')
                ? Object.values(c.currencies)
                    .map((d: any) => `${d.name} (${d.symbol})`)
                    .join(', ')
                : '',
              languages: c.hasOwnProperty('languages')
                ? Object.values(c.languages).join(', ')
                : '',
              borders: c.hasOwnProperty('borders')
                ? c.borders.map((h: any) => {
                    let io = countriesApi.find((f) => f.cca3 == h);
                    return {
                      id: h,
                      name: io.name.official ? io.name.official : '',
                    };
                  })
                : [],
            };
          });
          let regions_temp: any = countriesApi.map(
            (c: { region: string }) => c.region
          );
          regions_temp = new Set(regions_temp);
          let regions: string[] = Array.from(regions_temp);
          regions.unshift('');
          let filtered_countries = countries;
          let data = { countries, regions, filtered_countries };
          return homeActions.saveCountriesAndRegions({ data });
        })
      ),
    { dispatch: true }
  );
}
