import { env } from '../config/env';
import { IClientMappingResponse } from '../types/clientMapping';
import { IEmployeeDetailResponse } from '../types/user';
import createApiClient from '../utils/api';

const baseUrl = env.apiUrl + '/organization';

const client = createApiClient(baseUrl);

const organizationService = {
  getVendors: (id: Number) =>
    client.get(`${id}/vendor`).json<IClientMappingResponse>(),
  getAllEmployees: (id: Number) =>
    client.get(`${id}/users`).json<IEmployeeDetailResponse>(),
} as const;

export default organizationService;
