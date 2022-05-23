import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CountryModel } from '../../state/models/country.model';

import * as appSelector from '../../state/selectors/app.selector';
import * as countrySelector from '../../state/selectors/country.selector';
import * as homeActions from '../../state/actions/home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  is_light$: Observable<boolean> = this.store.select(appSelector.getTheme);

  region$: Observable<string> = this.store.select(appSelector.getRegion);

  search$: Observable<string> = this.store.select(appSelector.getSearch);

  is_loading$: Observable<boolean> = this.store.select(appSelector.getLoading);

  is_error$: Observable<string> = this.store.select(
    appSelector.getErrorMessage
  );

  visited_countries$: Observable<string[]> = this.store.select(
    appSelector.getVisitedCountries
  );

  countries$: Observable<CountryModel[]> = this.store.select(
    countrySelector.getFilteredCountries
  );

  regions$: Observable<string[]> = this.store.select(
    countrySelector.getRegions
  );

  regions: string[] = [];

  search = '';

  region_t = '';

  visited_countries: string[] = [];

  startUp() {
    this.store.dispatch(homeActions.startPage());

    this.search$
      .subscribe((x) => {
        this.search = x;
      })
      .unsubscribe();
    this.region$
      .subscribe((x) => {
        this.region_t = x;
      })
      .unsubscribe();

    //
    this.visited_countries$.subscribe((x) => {
      this.visited_countries = x;
    });
    this.regions$.subscribe((x) => {
      this.regions = x;
    });
  }

  reloadPage() {
    this.store.dispatch(homeActions.reloadPage());
  }

  regionChange(region: string) {
    this.store.dispatch(homeActions.filterCountriesRegion({ region }));
  }

  searchKeyUp(search: string) {
    this.store.dispatch(homeActions.filterCountriesSearch({ search }));
  }

  ngOnInit(): void {
    this.startUp();
  }
}
