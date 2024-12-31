export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  timing: {
    total: number;
    dns: number;
    tcp: number;
    firstByte: number;
    download: number;
  };
}