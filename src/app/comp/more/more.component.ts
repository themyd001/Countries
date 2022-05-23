import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CountryModel } from './../../state/models/country.model';

import * as appSelector from '../../state/selectors/app.selector';
import * as countrySelector from './../../state/selectors/country.selector';
import * as moreActions from './../../state/actions/more.actions';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute) {}

  is_light$: Observable<boolean> = this.store.select(appSelector.getTheme);

  is_loading$: Observable<boolean> = this.store.select(appSelector.getLoading);

  is_error$: Observable<string> = this.store.select(
    appSelector.getErrorMessage
  );

  regions$: Observable<string[]> = this.store.select(
    countrySelector.getRegions
  );

  regions: string[] = [];

  nowCountry$: Observable<CountryModel[]> = this.store
    .select(countrySelector.getNowCountryDetails)
    .pipe(
      map((c) => {
        if (c.length > 0) {
          let country = c[0];
          this.store.dispatch(moreActions.addVisitedCountries({ country }));
        }
        return c;
      })
    );

  startUp() {
    this.store.dispatch(moreActions.startPage());

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.store.dispatch(moreActions.addNowCountry({ id }));
    });

    this.regions$.subscribe((x) => {
      this.regions = x;
    });
  }

  reloadPage() {
    this.store.dispatch(moreActions.reloadPage());
  }
  ngOnInit(): void {
    this.startUp();
  }
}
