import { Injectable } from '@angular/core';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  attachPhoto(properties: Property[]) {
    properties.forEach(
      (p) => (p.img = 'assets/home{}.jpg'.replace('{}', String(p.id)))
    );
  }

  formatPrice(properties: Property[]) {
    properties.forEach(
      (p) => (p.priceStr = new Intl.NumberFormat().format(p.price))
    );
  }

  constructor() {}
}
