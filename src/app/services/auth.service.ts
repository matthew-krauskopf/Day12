import { Injectable, inject } from '@angular/core';
import { Profile } from '../model/profile';
import { Permission } from '../model/permission';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router: Router = inject(Router);
  private permissionSubject = new BehaviorSubject(this.checkUserPermission());

  profiles: Profile[] = [
    {
      username: 'guest01',
      password: 'pass123',
      permission: Permission.GUEST,
    },
    {
      username: 'admin01',
      password: 'pass123',
      permission: Permission.ADMIN,
    },
  ];

  performLogin(username: string, password: string) {
    let profile: Profile[] = this.profiles.filter(
      (p) => p.username == username
    );
    if (profile.length != 0 && profile[0].password == password) {
      this.permissionSubject.next(profile[0].permission);
      localStorage.setItem('permission', profile[0].permission.toString());
      this.router.navigate(['dashboard', 'properties']);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('permission');
    this.permissionSubject;
    this.router.navigate(['login']);
  }

  watchLoginState(): Observable<Permission> {
    return this.permissionSubject.asObservable();
  }

  checkUserPermission(): Permission {
    const strPerm = localStorage.getItem('permission');
    if (strPerm) {
      return strPerm == Permission.ADMIN.toString()
        ? Permission.ADMIN
        : Permission.GUEST;
    } else {
      return Permission.NONE;
    }
  }

  constructor() {}
}
