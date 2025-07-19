import { env } from '../config/env';
import { IClientMappingResponse } from '../types/clientMapping';
import { IEmployeeDetailResponse } from '../types/user';
import createApiClient from '../utils/api';

const baseUrl = env.apiUrl + '/operator/';

const client = createApiClient(baseUrl);

const operatorService = {
  getClients: (id: Number) =>
    client.get(`${id}/client`).json<IClientMappingResponse>(),
  getAllEmployees: (id: Number) =>
    client.get('').json<IEmployeeDetailResponse>(),
} as const;

export default operatorService;
