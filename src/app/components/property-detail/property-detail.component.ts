import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DbService } from '../../services/db.service';
import { Property } from '../../model/property';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
})
export class PropertyDetailComponent {
  db: DbService = inject(DbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  utils: UtilsService = inject(UtilsService);

  propertyId?: number;
  property?: Property;

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
  }
}
