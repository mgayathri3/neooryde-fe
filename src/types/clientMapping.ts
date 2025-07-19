import { AccountType } from './auth';
import { Response } from './response';

export interface IEntityAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  profilePicture: string | null;
}
export interface IBaseEntity {
  id: number;
  name: string;
  type: AccountType.CLIENT | AccountType.VENDOR;
  isActive: boolean;
  admin: IEntityAdmin;
  logo: string | null;
}

export interface ILinkedEntity {
  id: number;
  name: string;
  type: AccountType.CLIENT | AccountType.VENDOR;
  admin: IEntityAdmin;
  isActive: boolean;
  logo: string | null;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IClientMapping {
  baseEntity: IBaseEntity;
  linkedEntities: ILinkedEntity[];
  meta: IPaginationMeta;
}

export interface IClientAdminMapping {
  baseEntity: IBaseEntity;
  linkedEntities: ILinkedEntity[];
}

export interface IClientMappingResponse extends Response {
  data: IClientMapping;
}

export interface IClientMappingAdminResponse extends Response {
  data: {
    result: IClientAdminMapping[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    vendorCount?: number;
    clientCount?: number;
  };
}

export interface IClientMappingRequest {
  baseEntity: {
    id: number;
    type: AccountType;
    adminId: string;
  };
  linkedEntities: Array<{ id: number; adminId: string }>;
}
