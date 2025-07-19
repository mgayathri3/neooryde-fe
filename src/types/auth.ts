export interface User {
  id: string;
  username: string;
  role: 'admin' | 'operator' | 'corporate';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export enum AccountType {
  EMPTY = '',
  CLIENT = 'CLIENT',
  VENDOR = 'VENDOR',
  NEURYDE = 'NEURYDE',
}

export enum Roles {
  EMPTY = '',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  VENDOR_ADMIN = 'VENDOR_ADMIN',
  CLIENT_USER = 'CLIENT_USER',
  VENDOR_USER = 'VENDOR_USER',
  DRIVER = 'DRIVER',
  MEMBER = 'MEMBER',
}

export interface UserData {
  access_token: string;
  name: string;
  email: string;
  expiresIn: string;
  id: string;
  lastLoggedIn: string;
  role: Roles;
  userAccountType: AccountType;
  phone: string;
  alt: string;
  employerId: number;
  employerName: string;
  isActive: boolean;
}

export interface LoginResponse extends Response {
  data: UserData;
}

export interface AuthState {
  user: UserData | null;
  token: string | null;
  setUserData: (data: LoginResponse) => void;
  logout: () => void;
}
