import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent implements OnInit {
  db: DbService = inject(DbService);
  utils: UtilsService = inject(UtilsService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  permission$: Observable<Permission>;
  properties$: Observable<Property[] | undefined>;

  constructor() {
    this.permission$ = this.authService.watchLoginState();
    this.properties$ = this.db.fetchProperties();
  }

  ngOnInit(): void {
    this.db.loadProperties();
  }

  navigate(id: number) {
    this.router.navigate(['dashboard', 'details', id]);
  }

  deleteProperty(property: Property) {
    this.db.deleteProperty(property.id);
  }

  confirmDelete(p: Property) {
    const dialogRef = this.dialog.open(ConfirmActionComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe((action) => {
        if (action && action == true) {
          this.deleteProperty(p);
        }
      });
  }
}
