import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
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
        .pipe(
          map((properties) => {
            properties.forEach((p) => {
              this.utils.attachPhoto(p);
              this.utils.formatPrice(p);
            });
            return properties;
          }),
          catchError(this.handleError<Property[]>())
        )
        .subscribe((p) => {
          let property = p[0];
          if (p[0]) {
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
        .pipe(
          map((properties) => {
            properties.forEach((p) => {
              this.utils.attachPhoto(p);
              this.utils.formatPrice(p);
            });
            return properties;
          }),
          catchError(this.handleError<Property[]>())
        )
        .subscribe((properties) => {
          this.propertiesSubject.next(properties);
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

  addProperty(property: Property) {
    const current: Property[] | undefined = this.propertiesSubject.getValue();
    if (current) {
      property.id = Math.max(...current.map((c) => c.id)) + 1;
      this.propertiesSubject.next([...current, property]);
    } else {
      property.id = 1;
      this.propertiesSubject.next([property]);
    }
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log('Fetch failed: ', error);
      return of(result as T);
    };
  }
}
