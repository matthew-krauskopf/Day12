import { Component, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Property } from '../../model/property';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  db: DbService = inject(DbService);
  utils: UtilsService = inject(UtilsService);

  properties?: Property[];

  constructor() {
    this.db.fetchProperties().subscribe((p) => {
      this.properties = p;
      this.utils.attachPhoto(this.properties);
      this.utils.formatPrice(this.properties);
    });
  }
}
