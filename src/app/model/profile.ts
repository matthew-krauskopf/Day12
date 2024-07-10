import { Permission } from './permission';

export interface Profile {
  username: string;
  password: string;
  permission: Permission;
}
