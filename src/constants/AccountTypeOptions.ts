import { AccountType, Roles } from '../types/auth';

export interface IOption {
  label: string;
  value: Roles | AccountType | number;
}

export const accountTypeOptions: IOption[] = [
  { label: 'Vendor', value: AccountType.VENDOR },
  { label: 'Client', value: AccountType.CLIENT },
  { label: 'Neuryde', value: AccountType.NEURYDE },
];
