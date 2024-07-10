import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Permission } from '../model/permission';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.checkUserPermission() !== Permission.NONE) {
    return true;
  } else {
    return inject(Router).navigate(['/login']);
  }
};
