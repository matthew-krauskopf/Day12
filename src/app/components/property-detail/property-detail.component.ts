import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DbService } from '../../services/db.service';
import { Property } from '../../model/property';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Permission } from '../../model/permission';
import { MatDialog } from '@angular/material/dialog';
import { EditDetailsComponent } from '../dialog/edit-details/edit-details.component';
import { EditLayoutComponent } from '../dialog/edit-layout/edit-layout.component';
import { EditSellerComponent } from '../dialog/edit-seller/edit-seller.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
})
export class PropertyDetailComponent {
  db: DbService = inject(DbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  utils: UtilsService = inject(UtilsService);
  authService: AuthService = inject(AuthService);
  dialog: MatDialog = inject(MatDialog);

  propertyId?: number;
  property?: Property;
  isAdmin: boolean = false;

  constructor() {
    this.route.paramMap.subscribe((pm: ParamMap) => {
      this.propertyId = Number(pm.get('id'));
      this.db.fetchProperty(this.propertyId).subscribe((p) => {
        if (p.length != 0) {
          this.property = p[0];
          this.utils.attachPhoto(this.property);
          this.utils.formatPrice(this.property);
        } else {
          this.router.navigate(['not-found']);
        }
      });
    });

    this.authService
      .watchLoginState()
      .subscribe(
        (permission) => (this.isAdmin = permission === Permission.ADMIN)
      );
  }

  editDetails() {
    const dialogRef = this.dialog.open(EditDetailsComponent, {
      data: {
        price: this.property?.price,
        address: this.property?.address,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (this.property && form) {
        this.property.price = form.value.price;
        this.property.address.street = form.value.street;
        this.property.address.city = form.value.city;
        this.property.address.state = form.value.state;

        this.utils.formatPrice(this.property);
      }
    });
  }

  editLayout() {
    const dialogRef = this.dialog.open(EditLayoutComponent, {
      data: {
        bed: this.property?.bed,
        bath: this.property?.bath,
        sqFt: this.property?.sqFt,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (this.property && form) {
        this.property.bed = form.value.bed;
        this.property.bath = form.value.bath;
        this.property.sqFt = form.value.sqFt;
      }
    });
  }

  editSeller() {
    const dialogRef = this.dialog.open(EditSellerComponent, {
      data: {
        name: this.property?.seller.name,
        phone: this.property?.seller.phone,
      },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (this.property && form) {
        this.property.seller.name = form.value.name;
        this.property.seller.phone = form.value.phone;
      }
    });
  }
}
