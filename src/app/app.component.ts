import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { changeTheme } from './state/actions/app.actions';
import { getTheme } from './state/selectors/app.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {}
  title = 'reloadly';

  is_light$: Observable<boolean> = this.store.select(getTheme);

  changeTheme() {
    this.store.dispatch(changeTheme());
  }
}
