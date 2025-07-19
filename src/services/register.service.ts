import { ApiError } from '~/types/response';
import { env } from '../config/env';
import { GetAllOperators } from '../types/operator';
import { GetAllOrganizations } from '../types/organization';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '../types/registerUser';
import createApiClient from '../utils/api';

const baseUrl = env.apiUrl;

const client = createApiClient(baseUrl);

const registerService = {
  // this is just for sample on how to process error response from backend
  // and display respective error message if needed.
  register: async (userdata: RegisterUserRequest) => {
    try {
      await client
        .post(`user/register`, { json: userdata })
        .json<RegisterUserResponse>();
    } catch (error: any) {
      if (error.name === 'HTTPError') {
        const errorJson: ApiError = await error?.response?.json();
        if (errorJson.error.errorDescription) {
          throw new Error(errorJson.message);
        }
      }
    }
  },
  getAllOperators: () => client.get(`operator`).json<GetAllOperators>(),
  getAllOrganizations: () =>
    client.get(`organization`).json<GetAllOrganizations>(),
} as const;

export default registerService;
