import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DbService } from '../../services/db.service';
import { Property } from '../../model/property';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Permission } from '../../model/permission';
import { MatDialog } from '@angular/material/dialog';
import { EditDetailsComponent } from '../dialog/edit-details/edit-details.component';
import { EditLayoutComponent } from '../dialog/edit-layout/edit-layout.component';
import { EditSellerComponent } from '../dialog/edit-seller/edit-seller.component';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

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
  authService: AuthService = inject(AuthService);
  dialog: MatDialog = inject(MatDialog);

  user$: Observable<string | null>;
  property$: Observable<Property | undefined>;
  permission$: Observable<Permission>;

  constructor() {
    this.user$ = this.authService.watchUser();
    this.permission$ = this.authService.watchLoginState();
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
        property.price = form.value.price;
        property.address.street = form.value.street;
        property.address.city = form.value.city;
        property.address.state = form.value.state;

        this.utils.formatPrice(property);
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
        property.bed = form.value.bed;
        property.bath = form.value.bath;
        property.sqFt = form.value.sqFt;
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
        property.seller.name = form.value.name;
        property.seller.phone = form.value.phone;
      }
    });
  }
}
