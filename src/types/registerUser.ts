import { AccountType, Roles } from './auth';

export interface RegisterUserRequest {
  email: string;
  phone: string;
  password: string;
  userAccountType: AccountType;
  role: Roles;
  orgId?: number;
}

export interface RegisterUserResponse extends Response {
  data: {
    userId: string;
  };
}
