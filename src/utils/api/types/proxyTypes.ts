export interface ProxyConfig {
  enabled: boolean;
  protocol: 'http' | 'https';
  host: string;
  port: string;
  requiresAuth: boolean;
  username?: string;
  password?: string;
  targetHost?: string;
  targetPort?: string;
}