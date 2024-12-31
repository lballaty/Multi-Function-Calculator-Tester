import React from 'react';
import { Protocol, HttpMethod, IpVersion, ApiRequest } from '../../utils/apiTypes';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface RequestBuilderProps {
  request: ApiRequest;
  onChange: (request: Partial<ApiRequest>) => void;
}

export default function RequestBuilder({ request, onChange }: RequestBuilderProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <EnhancedTooltipWrapper tooltip="Select the protocol">
          <select
            value={request.protocol}
            onChange={(e) => onChange({ protocol: e.target.value as Protocol })}
            className="w-full p-2 border rounded"
          >
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
            <option value="ws">WS</option>
            <option value="wss">WSS</option>
          </select>
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Select the HTTP method">
          <select
            value={request.method}
            onChange={(e) => onChange({ method: e.target.value as HttpMethod })}
            className="w-full p-2 border rounded"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
          </select>
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Select IP version">
          <select
            value={request.ipVersion}
            onChange={(e) => onChange({ ipVersion: e.target.value as IpVersion })}
            className="w-full p-2 border rounded"
          >
            <option value="IPv4">IPv4</option>
            <option value="IPv6">IPv6</option>
          </select>
        </EnhancedTooltipWrapper>

        <EnhancedTooltipWrapper tooltip="Enter the port number">
          <input
            type="text"
            value={request.port}
            onChange={(e) => onChange({ port: e.target.value })}
            placeholder="Port (e.g., 443)"
            className="w-full p-2 border rounded"
          />
        </EnhancedTooltipWrapper>
      </div>

      <EnhancedTooltipWrapper tooltip="Enter the host/IP address">
        <input
          type="text"
          value={request.host}
          onChange={(e) => onChange({ host: e.target.value })}
          placeholder="Host (e.g., api.example.com or 192.168.1.1)"
          className="w-full p-2 border rounded"
        />
      </EnhancedTooltipWrapper>

      <EnhancedTooltipWrapper tooltip="Enter the path">
        <input
          type="text"
          value={request.path}
          onChange={(e) => onChange({ path: e.target.value })}
          placeholder="Path (e.g., /api/v1/users)"
          className="w-full p-2 border rounded"
        />
      </EnhancedTooltipWrapper>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Headers</h3>
        <div className="border rounded p-4 space-y-2">
          {Object.entries(request.headers).map(([key, value], index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newHeaders = { ...request.headers };
                  delete newHeaders[key];
                  newHeaders[e.target.value] = value;
                  onChange({ headers: newHeaders });
                }}
                placeholder="Header name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  onChange({
                    headers: { ...request.headers, [key]: e.target.value }
                  });
                }}
                placeholder="Header value"
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            onClick={() => {
              onChange({
                headers: { ...request.headers, '': '' }
              });
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            + Add Header
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Request Body</h3>
        <EnhancedTooltipWrapper tooltip="Enter the request body (JSON)">
          <textarea
            value={request.body}
            onChange={(e) => onChange({ body: e.target.value })}
            placeholder="Request body (JSON)"
            rows={5}
            className="w-full p-2 border rounded font-mono text-sm"
          />
        </EnhancedTooltipWrapper>
      </div>
    </div>
  );
}