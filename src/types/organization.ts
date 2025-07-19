import { GetAll } from './response';

export interface GetAllOrganizations extends Response {
  data: GetAll[];
}
