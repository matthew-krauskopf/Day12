import { Component, inject, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Property } from '../../model/property';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { Permission } from '../../model/permission';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../dialog/confirm-action/confirm-action.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AddListingComponent } from '../dialog/add-listing/add-listing.component';
import { FormGroup } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { StoreType } from '../../model/storeType';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  db: DbService = inject(DbService);
  utils: UtilsService = inject(UtilsService);
  authService: AuthService = inject(AuthService);
  storeService: StoreService = inject(StoreService);
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  user$: Observable<string | null>;
  permission$: Observable<Permission>;
  properties$: Observable<Property[] | undefined>;

  constructor() {
    this.user$ = this.authService.watchUser();
    this.permission$ = this.authService.watchLoginState();
    this.properties$ = this.db.fetchProperties();
  }

  navigate(id: number) {
    this.router.navigate(['dashboard', 'details', id]);
  }

  deleteProperty(property: Property) {
    this.db.deleteProperty(property.id);
  }

  confirmDelete(p: Property) {
    const dialogRef = this.dialog.open(ConfirmActionComponent);

    dialogRef.afterClosed().subscribe((action) => {
      if (action && action == true) {
        this.deleteProperty(p);
      }
    });
  }

  addProperty() {
    const dialogRef = this.dialog.open(AddListingComponent);

    dialogRef.afterClosed().subscribe((form: FormGroup) => {
      if (form) {
        this.db.addProperty(
          this.utils.buildProperty(
            form,
            this.storeService.getItem(StoreType.USER) ?? 'N/A'
          )
        );
      }
    });
  }

  createdByUser(p: Property, user: string | null) {
    return p.createdBy == user;
  }
}
