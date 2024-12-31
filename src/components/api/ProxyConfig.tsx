import React from 'react';
import { Protocol, ProxyConfig } from '../../utils/apiTypes';
import EnhancedTooltipWrapper from '../EnhancedTooltipWrapper';

interface ProxyConfigProps {
  config: ProxyConfig;
  onChange: (config: Partial<ProxyConfig>) => void;
}

export default function ProxyConfig({ config, onChange }: ProxyConfigProps) {
  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Proxy Configuration</h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => onChange({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {config.enabled && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <EnhancedTooltipWrapper tooltip="Select the proxy protocol">
              <select
                value={config.protocol}
                onChange={(e) => onChange({ protocol: e.target.value as Protocol })}
                className="w-full p-2 border rounded"
              >
                <option value="http">HTTP</option>
                <option value="https">HTTPS</option>
              </select>
            </EnhancedTooltipWrapper>

            <EnhancedTooltipWrapper tooltip="Enter the proxy port">
              <input
                type="text"
                value={config.port}
                onChange={(e) => onChange({ port: e.target.value })}
                placeholder="Proxy Port (e.g., 8080)"
                className="w-full p-2 border rounded"
              />
            </EnhancedTooltipWrapper>
          </div>

          <EnhancedTooltipWrapper tooltip="Enter the proxy host/IP address">
            <input
              type="text"
              value={config.host}
              onChange={(e) => onChange({ host: e.target.value })}
              placeholder="Proxy Host (e.g., 127.0.0.1)"
              className="w-full p-2 border rounded"
            />
          </EnhancedTooltipWrapper>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Target Configuration</h4>
            <div className="grid grid-cols-2 gap-4">
              <EnhancedTooltipWrapper tooltip="Enter the target host/IP address">
                <input
                  type="text"
                  value={config.targetHost || ''}
                  onChange={(e) => onChange({ targetHost: e.target.value })}
                  placeholder="Target Host"
                  className="w-full p-2 border rounded"
                />
              </EnhancedTooltipWrapper>

              <EnhancedTooltipWrapper tooltip="Enter the target port">
                <input
                  type="text"
                  value={config.targetPort || ''}
                  onChange={(e) => onChange({ targetPort: e.target.value })}
                  placeholder="Target Port"
                  className="w-full p-2 border rounded"
                />
              </EnhancedTooltipWrapper>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={config.requiresAuth}
                onChange={(e) => onChange({ requiresAuth: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Proxy Requires Authentication</span>
            </div>

            {config.requiresAuth && (
              <div className="grid grid-cols-2 gap-4">
                <EnhancedTooltipWrapper tooltip="Enter proxy username">
                  <input
                    type="text"
                    value={config.username || ''}
                    onChange={(e) => onChange({ username: e.target.value })}
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                  />
                </EnhancedTooltipWrapper>

                <EnhancedTooltipWrapper tooltip="Enter proxy password">
                  <input
                    type="password"
                    value={config.password || ''}
                    onChange={(e) => onChange({ password: e.target.value })}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                  />
                </EnhancedTooltipWrapper>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}