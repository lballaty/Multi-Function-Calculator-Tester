import { ApiEndpoint } from './apiTypes';

export const predefinedApis: ApiEndpoint[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'api.openai.com',
    description: 'OpenAI API for AI models and services',
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    endpoints: [
      {
        path: '/v1/chat/completions',
        method: 'POST',
        description: 'Create chat completion'
      },
      {
        path: '/v1/models',
        method: 'GET',
        description: 'List available models'
      }
    ]
  },
  {
    id: 'homeassistant',
    name: 'Home Assistant',
    baseUrl: 'homeassistant.local',
    description: 'Home Assistant local API',
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    endpoints: [
      {
        path: '/api/states',
        method: 'GET',
        description: 'Get all states'
      },
      {
        path: '/api/services',
        method: 'GET',
        description: 'Get available services'
      }
    ]
  }
];