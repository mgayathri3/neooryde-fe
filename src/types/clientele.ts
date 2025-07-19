import { AccountType } from './auth';

export interface IClientele {
  id: number;
  name: string;
  type: AccountType.CLIENT | AccountType.VENDOR;
  logo: string | null;
  location: string | null;
  isActive: boolean;
}

export interface IClientsResponse extends Response {
  data: IClientele[];
}

export interface ICreateClientRequest {
  name: string;
  type: AccountType;
  isActive: boolean;
}

export interface IClientUpdateRequest {
  id: number;
  type: AccountType;
}

export interface IUpdateClientStatusRequest extends IClientUpdateRequest {
  isActive: boolean;
}
