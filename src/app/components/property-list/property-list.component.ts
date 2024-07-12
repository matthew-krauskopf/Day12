import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  db: DbService = inject(DbService);
  utils: UtilsService = inject(UtilsService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  isAdmin: boolean = false;
  properties?: Property[];

  constructor() {
    this.db.fetchProperties().subscribe((p) => {
      this.properties = p;
      this.utils.attachPhotos(this.properties);
      this.utils.formatPrices(this.properties);
    });
    this.authService
      .watchLoginState()
      .subscribe(
        (permission) => (this.isAdmin = permission === Permission.ADMIN)
      );
  }

  navigate(id: number) {
    this.router.navigate(['dashboard', 'details', id]);
  }

  deleteProperty(property: Property) {
    this.properties = this.properties?.filter((p) => p.id != property.id);
  }

  confirmDelete(p: Property) {
    const dialogRef = this.dialog.open(ConfirmActionComponent);

    dialogRef.afterClosed().subscribe((action) => {
      if (action && action == true) {
        this.deleteProperty(p);
      }
    });
  }
}
