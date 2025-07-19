import { Roles } from '../types/auth';
import { IOption } from './AccountTypeOptions';

export const rolesOptions: IOption[] = [
  {
    label: 'Admin',
    value: Roles.ADMIN,
  },
  {
    label: 'Client Admin',
    value: Roles.CLIENT_ADMIN,
  },
  {
    label: 'Client User',
    value: Roles.CLIENT_USER,
  },
  {
    label: 'Vendor Admin',
    value: Roles.VENDOR_ADMIN,
  },
  {
    label: 'Vendor User',
    value: Roles.VENDOR_USER,
  },
  {
    label: 'Driver',
    value: Roles.DRIVER,
  },
  {
    label: 'Member',
    value: Roles.MEMBER,
  },
];
