import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Permission } from '../../model/permission';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  loggedIn: boolean = false;

  constructor() {
    this.authService
      .watchLoginState()
      .pipe(takeUntilDestroyed())
      .subscribe((permission) => {
        if (permission === Permission.NONE) {
          this.router.navigate(['login']);
        }
      });
  }

  goHome() {
    this.router.navigate(['dashboard', 'properties']);
  }
}
