import { HttpMethod } from './requestTypes';

export interface ApiEndpoint {
  id: string;
  name: string;
  baseUrl: string;
  description: string;
  defaultHeaders?: Record<string, string>;
  endpoints?: {
    path: string;
    method: HttpMethod;
    description: string;
  }[];
}