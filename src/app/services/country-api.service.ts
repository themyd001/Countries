import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  constructor(private http: HttpClient) {}

  getApiCountries(): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
}
