import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Property } from '../../model/property';
import { DbService } from '../../services/db.service';
import { UtilsService } from '../../services/utils.service';
import { EditDetailsComponent } from '../dialog/edit-details/edit-details.component';
import { EditLayoutComponent } from '../dialog/edit-layout/edit-layout.component';
import { EditSellerComponent } from '../dialog/edit-seller/edit-seller.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, NgIf],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
})
export class PropertyDetailComponent implements OnInit {
  db: DbService = inject(DbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  utils: UtilsService = inject(UtilsService);
  dialog: MatDialog = inject(MatDialog);

  property$: Observable<Property | undefined>;

  constructor() {
    this.property$ = this.db.fetchProperty();
  }

  ngOnInit() {
    this.db.loadProperty(this.route.snapshot.params['id']);
  }

  editDetails(property: Property) {
    const dialogRef = this.dialog.open(EditDetailsComponent, {
      data: {
        price: property.price,
        address: property.address,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (property && form) {
        this.db.editProperty(
          this.utils.formatPrice({
            ...property,
            price: form.value.price,
            address: {
              street: form.value.street,
              city: form.value.city,
              state: form.value.state,
            },
          })
        );
      }
    });
  }

  editLayout(property: Property) {
    const dialogRef = this.dialog.open(EditLayoutComponent, {
      data: {
        bed: property.bed,
        bath: property.bath,
        sqFt: property.sqFt,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (property && form) {
        this.db.editProperty({
          ...property,
          bed: form.value.bed,
          bath: form.value.bath,
          sqFt: form.value.sqFt,
        });
      }
    });
  }

  editSeller(property: Property) {
    const dialogRef = this.dialog.open(EditSellerComponent, {
      data: {
        name: property.seller.name,
        phone: property.seller.phone,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (property && form) {
        this.db.editProperty({
          ...property,
          seller: {
            name: form.value.name,
            phone: form.value.phone,
          },
        });
      }
    });
  }
}
