import { env } from '../config/env';
import { LoginCredentials, LoginResponse } from '../types/auth';
import {
  IClientsResponse,
  IClientUpdateRequest,
  ICreateClientRequest,
  IUpdateClientStatusRequest,
} from '../types/clientele';
import {
  IClientMappingAdminResponse,
  IClientMappingRequest,
  IClientMappingResponse,
} from '../types/clientMapping';
import {
  FeatureFlagsResponse,
  FeaturesRequest,
  FeaturesResponse,
  ModifyFeatureRequest,
} from '../types/features';
import {
  IEmployeeDetailResponse,
  IPermanentlyDeleteUserRequest,
} from '../types/user';
import createApiClient from '../utils/api';

const baseUrl = env.apiUrl;

const client = createApiClient(baseUrl);

const coreService = {
  login: (userdata: LoginCredentials) =>
    client.post(`auth/login`, { json: userdata }).json<LoginResponse>(),

  getFeatures: () => client.get(`core/features`).json<FeatureFlagsResponse>(),

  getAllFeatures: () =>
    client.get(`core/all-features`).json<FeaturesResponse>(),

  createFeatureFlag: (data: FeaturesRequest) =>
    client.post(`core/feature`, { json: data }).json(),

  modifyFeatureFlag: (data: ModifyFeatureRequest) =>
    client.put(`core/feature`, { json: data }).json(),

  deleteFeatureFlag: (featureId: number) =>
    client.delete(`core/feature/${featureId}`).json(),
  getAllClients: () => client.get('clients').json<IClientsResponse>(),
  getClienteleByType: (type: string) =>
    client
      .get(`entity?type=${type}&page=1&limit=100&all=true`)
      .json<IClientMappingAdminResponse>(),
  getClients: (id: Number) =>
    client.get(`clients/${id}/client`).json<IClientMappingResponse>(),
  createClient: (data: ICreateClientRequest) =>
    client.post(`clients`, { json: data }).json(),
  updateClientStatus: (data: IUpdateClientStatusRequest) =>
    client.put(`clients/status/${data.id}`, {
      json: {
        type: data.type,
        isActive: data.isActive,
      },
    }),
  deleteClient: (data: IClientUpdateRequest) =>
    client.delete(`clients/${data.id}/${data.type}`),
  linkEntities: (data: IClientMappingRequest) =>
    client.post(`entity/link`, { json: data }).json(),

  getAllUsers: () => client.get('users').json<IEmployeeDetailResponse>(),
  archiveUser: (id: string) => client.delete(`users/deactivate/${id}`).json(),
  permanentlyDeleteUser: (id: string, data: IPermanentlyDeleteUserRequest) =>
    client.delete(`users/${id}`, { json: data }).json(),
} as const;

export default coreService;
