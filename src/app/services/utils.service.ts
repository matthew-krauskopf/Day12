import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Permission } from '../model/permission';
import { Property } from '../model/property';
import { StoreType } from '../model/storeType';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  store: StoreService = inject(StoreService);

  attachPhoto(property: Property): Property {
    return {
      ...property,
      imgs: [
        'assets/homes/{}/1.webp'.replace('{}', String(property.id)),
        'assets/homes/{}/2.webp'.replace('{}', String(property.id)),
        'assets/homes/{}/3.webp'.replace('{}', String(property.id)),
      ],
    };
  }

  attachPhotos(properties: Property[]): Property[] {
    return properties.map(this.attachPhoto);
  }

  formatPriceStr(input: number): string {
    return new Intl.NumberFormat().format(input);
  }

  formatPrice(property: Property): Property {
    return {
      ...property,
      priceStr: new Intl.NumberFormat().format(property.price),
    };
  }

  formatPrices(properties: Property[]): Property[] {
    return properties.map(this.formatPrice);
  }

  markEditable(property: Property): Property {
    return {
      ...property,
      editable:
        this.store.getItem(StoreType.USER) == property.createdBy ||
        this.store.getItem(StoreType.PERMISSION) == Permission.ADMIN.toString(),
    };
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
      editable: true,
    };
  }

  processProperty(property: Property): Property {
    return this.attachPhoto(this.formatPrice(this.markEditable(property)));
  }

  constructor() {}
}
