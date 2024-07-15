import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Property } from '../model/property';
import { State } from '../model/state';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  http: HttpClient = inject(HttpClient);
  utils: UtilsService = inject(UtilsService);

  baseUrl: string = 'https://json-server-vercel-ebon.vercel.app';
  propertyEndpoint = '/properties';
  stateEndpoint = '/states';

  stateSubject = new BehaviorSubject<State[] | undefined>(undefined);
  propertySubject = new BehaviorSubject<Property | undefined>(undefined);
  propertiesSubject = new BehaviorSubject<Property[] | undefined>(undefined);

  loadProperty(id: number): void {
    if (this.propertiesSubject.getValue()) {
      this.propertySubject.next(
        this.propertiesSubject.getValue()?.filter((p) => p.id == id)[0]
      );
    } else {
      this.http
        .get<Property[]>(this.baseUrl + this.propertyEndpoint + '?id=' + id)
        .pipe(catchError(this.handleError<Property[]>()))
        .subscribe((p) => {
          let property = p[0];
          if (p[0]) {
            this.utils.attachPhoto(property);
            this.utils.formatPrice(property);
            this.propertySubject.next(property);
          }
        });
    }
  }

  fetchProperty(): Observable<Property | undefined> {
    return this.propertySubject.asObservable();
  }

  fetchProperties(): Observable<Property[] | undefined> {
    return this.propertiesSubject.asObservable();
  }

  loadProperties(): void {
    if (!this.propertiesSubject.getValue()) {
      this.http
        .get<Property[]>(this.baseUrl + this.propertyEndpoint)
        .pipe(catchError(this.handleError<Property[]>()))
        .subscribe((p) => {
          this.utils.attachPhotos(p);
          this.utils.formatPrices(p);
          this.propertiesSubject.next(p);
        });
    }
  }

  deleteProperty(id: number) {
    this.propertiesSubject.next(
      this.propertiesSubject.getValue()?.filter((p) => p.id != id)
    );
  }

  loadStates(): void {
    this.http
      .get<State[]>(this.baseUrl + this.stateEndpoint)
      .pipe(catchError(this.handleError<State[]>()))
      .subscribe((s) => this.stateSubject.next(s));
  }

  fetchStates(): Observable<State[] | undefined> {
    return this.stateSubject.asObservable();
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log('Fetch failed: ', error);
      return of(result as T);
    };
  }
}
