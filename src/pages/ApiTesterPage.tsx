import React, { useState } from 'react';
import RequestBuilder from '../components/api/RequestBuilder';
import ResponseViewer from '../components/api/ResponseViewer';
import ProxyConfigPanel from '../components/api/ProxyConfigPanel';
import { ApiRequest, ApiResponse, ProxyConfig } from '../utils/apiTypes';
import DocLink from '../components/DocLink';

const defaultRequest: ApiRequest = {
  protocol: 'https',
  method: 'GET',
  ipVersion: 'IPv4',
  host: '',
  port: '443',
  path: '',
  headers: {},
  queryParams: {},
  body: '',
  proxy: {
    enabled: false,
    protocol: 'http',
    host: '',
    port: '',
    requiresAuth: false
  }
};

export default function ApiTesterPage() {
  const [request, setRequest] = useState<ApiRequest>(defaultRequest);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleRequestChange = (changes: Partial<ApiRequest>) => {
    setRequest(prev => ({ ...prev, ...changes }));
  };

  const handleProxyChange = (changes: Partial<ProxyConfig>) => {
    setRequest(prev => ({
      ...prev,
      proxy: { ...prev.proxy, ...changes }
    }));
  };

  const handleSend = async () => {
    try {
      // Implement API request logic here
      // For now, just show a mock response
      const mockResponse: ApiResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'server': 'MockServer'
        },
        body: JSON.stringify({ message: 'Success' }, null, 2),
        timing: {
          total: 150,
          dns: 10,
          tcp: 20,
          firstByte: 100,
          download: 20
        }
      };
      setResponse(mockResponse);
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <DocLink />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold">API Tester</h2>

        <RequestBuilder
          request={request}
          onChange={handleRequestChange}
        />

        <ProxyConfigPanel
          config={request.proxy}
          onChange={handleProxyChange}
        />

        <button
          onClick={handleSend}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send Request
        </button>

        {response && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Response</h3>
            <ResponseViewer response={response} />
          </div>
        )}
      </div>
    </div>
  );
}