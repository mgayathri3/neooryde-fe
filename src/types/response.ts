export interface Response {
  message: string;
  statusCode: number;
}

export interface GetAll {
  id: number;
  name: string;
}

export interface Error {
  errorDescription: string;
  errorTitle: string;
}

export interface ApiError extends Response {
  error: Error;
}
