import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, switchMap } from 'rxjs';
import { Permission } from '../model/permission';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);

  canActivate() {
    return this.authService.watchLoginState().pipe(
      switchMap((perm: Permission) => {
        if (this.authService.isLoggedIn(perm)) {
          return of(true);
        } else {
          inject(Router).navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
