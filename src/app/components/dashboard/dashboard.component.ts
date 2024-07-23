import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbService } from '../../services/db.service';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopBarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  db: DbService = inject(DbService);

  ngOnInit(): void {
    this.db.loadProperties();
  }

  ngOnDestroy(): void {
    this.db.unloadProperties();
  }
}
