import React from 'react';
import { ApiResponse } from '../../utils/apiTypes';

interface ResponseViewerProps {
  response: ApiResponse | null;
}

export default function ResponseViewer({ response }: ResponseViewerProps) {
  if (!response) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-sm ${
          response.status < 400 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {response.status} {response.statusText}
        </span>
        
        <div className="text-sm text-gray-600">
          Total: {response.timing.total}ms | 
          DNS: {response.timing.dns}ms | 
          TCP: {response.timing.tcp}ms | 
          TTFB: {response.timing.firstByte}ms | 
          Download: {response.timing.download}ms
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Response Headers</h3>
        <div className="bg-gray-50 p-4 rounded font-mono text-sm">
          {Object.entries(response.headers).map(([key, value]) => (
            <div key={key}>
              <span className="text-gray-600">{key}:</span> {value}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Response Body</h3>
        <pre className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
          {typeof response.body === 'string' 
            ? response.body 
            : JSON.stringify(response.body, null, 2)}
        </pre>
      </div>
    </div>
  );
}