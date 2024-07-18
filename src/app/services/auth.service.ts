import { inject, Injectable } from '@angular/core';
import { Profile } from '../model/profile';
import { Permission } from '../model/permission';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from './store.service';
import { StoreType } from '../model/storeType';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storeService: StoreService = inject(StoreService);

  private userSubject = new BehaviorSubject(
    this.storeService.getItem(StoreType.USER)
  );
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
      this.userSubject.next(username);
      this.permissionSubject.next(profile[0].permission);
      this.storeService.storeItem(StoreType.USER, username);
      this.storeService.storeItem(
        StoreType.PERMISSION,
        profile[0].permission.toString()
      );
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.storeService.removeItem(StoreType.USER);
    this.storeService.removeItem(StoreType.PERMISSION);
    this.permissionSubject.next(Permission.NONE);
  }

  watchLoginState(): Observable<Permission> {
    return this.permissionSubject.asObservable();
  }

  watchUser(): Observable<string | null> {
    return this.userSubject.asObservable();
  }

  private checkUserPermission(): Permission {
    const strPerm = this.storeService.getItem(StoreType.PERMISSION);
    if (strPerm) {
      return strPerm == Permission.ADMIN.toString()
        ? Permission.ADMIN
        : Permission.GUEST;
    } else {
      return Permission.NONE;
    }
  }

  isLoggedIn(perm: Permission) {
    return perm !== Permission.NONE;
  }

  isAdmin(perm: Permission | null) {
    return perm && perm === Permission.ADMIN;
  }
}
