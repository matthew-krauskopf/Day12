import { Injectable } from '@angular/core';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  attachPhoto(property: Property) {
    property.imgs = [
      'assets/homes/{}/1.webp'.replace('{}', String(property.id)),
      'assets/homes/{}/2.webp'.replace('{}', String(property.id)),
      'assets/homes/{}/3.webp'.replace('{}', String(property.id)),
    ];
  }

  attachPhotos(properties: Property[]) {
    properties.forEach(this.attachPhoto);
  }

  formatPrice(property: Property) {
    property.priceStr = new Intl.NumberFormat().format(property.price);
  }

  formatPrices(properties: Property[]) {
    properties.forEach(this.formatPrice);
  }

  constructor() {}
}
