import { CountryEffects } from './state/effects/country.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './comp/home/home.component';
import { MoreComponent } from './comp/more/more.component';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './state/reducers/app.reducer';
import { CountryReducer } from './state/reducers/country.reducer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HomeComponent, MoreComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    EffectsModule.forRoot([CountryEffects]),
    StoreModule.forRoot({ app: appReducer, countries: CountryReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
