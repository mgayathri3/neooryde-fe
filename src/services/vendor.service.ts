import { env } from '../config/env';
import { IEmployeeDetailResponse } from '../types/user';
import createApiClient from '../utils/api';

const baseUrl = env.apiUrl + '/vendor';

const client = createApiClient(baseUrl);

const vendorService = {
  getAllEmployees: (id: number) =>
    client.get(`${id}/employees`).json<IEmployeeDetailResponse>(),
} as const;

export default vendorService;
