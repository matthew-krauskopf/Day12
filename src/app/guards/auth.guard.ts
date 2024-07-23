import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { Permission } from '../model/permission';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router: Router = inject(Router);

  canActivate() {
    return this.authService.watchLoginState().pipe(
      map((perm: Permission) => {
        if (this.authService.isLoggedIn(perm)) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
