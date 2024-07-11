import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  http: HttpClient = inject(HttpClient);

  baseUrl: string = 'https://json-server-vercel-ebon.vercel.app';
  propertyEndpoint = '/properties';

  fetchProperty(id: number): Observable<Property[]> {
    return this.http
      .get<Property[]>(this.baseUrl + this.propertyEndpoint + '?id=' + id)
      .pipe(catchError(this.handleError<Property[]>()));
  }

  fetchProperties(): Observable<Property[]> {
    return this.http
      .get<Property[]>(this.baseUrl + this.propertyEndpoint)
      .pipe(catchError(this.handleError<Property[]>()));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log('Fetch failed: ', error);
      return of(result as T);
    };
  }
}
