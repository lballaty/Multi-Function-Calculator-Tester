import { ProxyConfig } from './proxyTypes';

export type Protocol = 'http' | 'https' | 'ws' | 'wss';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
export type IpVersion = 'IPv4' | 'IPv6';

export interface ApiRequest {
  protocol: Protocol;
  method: HttpMethod;
  ipVersion: IpVersion;
  host: string;
  port: string;
  path: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: string;
  proxy: ProxyConfig;
}