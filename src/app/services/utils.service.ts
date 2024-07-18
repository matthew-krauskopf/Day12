import { Injectable } from '@angular/core';
import { Property } from '../model/property';
import { FormGroup } from '@angular/forms';

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

  formatPriceStr(input: number): string {
    return new Intl.NumberFormat().format(input);
  }

  formatPrice(property: Property) {
    property.priceStr = new Intl.NumberFormat().format(property.price);
  }

  formatPrices(properties: Property[]) {
    properties.forEach(this.formatPrice);
  }

  buildProperty(form: FormGroup, user: string): Property {
    return {
      id: -1,
      price: form.value.price,
      priceStr: this.formatPriceStr(form.value.price),
      address: {
        city: form.value.city,
        state: form.value.state,
        street: form.value.street,
      },
      bed: form.value.bed,
      bath: form.value.bath,
      sqFt: form.value.sqFt,
      imgs: ['assets/no_img.jpg'],
      seller: {
        name: form.value.name,
        phone: form.value.phone,
      },
      createdBy: user,
    };
  }

  constructor() {}
}
