import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';
import { Permission } from '../model/permission';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  PERMISSION: string = 'permission';
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
      localStorage.setItem(this.PERMISSION, profile[0].permission.toString());
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.PERMISSION);
    this.permissionSubject.next(Permission.NONE);
  }

  watchLoginState(): Observable<Permission> {
    return this.permissionSubject.asObservable();
  }

  checkUserPermission(): Permission {
    const strPerm = localStorage.getItem(this.PERMISSION);
    if (strPerm) {
      return strPerm == Permission.ADMIN.toString()
        ? Permission.ADMIN
        : Permission.GUEST;
    } else {
      return Permission.NONE;
    }
  }

  isAdmin(perm: Permission | null) {
    return perm && perm === Permission.ADMIN;
  }
}
