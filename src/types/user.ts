import { AccountType, Roles } from './auth';
import { Response } from './response';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  profilePicture: string;
  role: Roles;
  organization: string;
  isActive: boolean;
}

export interface IEmployeeDetailResponse extends Response {
  data: {
    result: UserProfile[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface IPermanentlyDeleteUserRequest {
  organization: string;
  role: Roles;
}

export interface IPermanentlyDeleteUserInput {
  id: string;
  data: IPermanentlyDeleteUserRequest;
}
