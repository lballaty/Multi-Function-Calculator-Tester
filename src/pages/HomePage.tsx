import React from 'react';
import { Calculator } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <Calculator className="h-24 w-24 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Calculator</h1>
      <p className="text-lg text-gray-600 mb-2">Version 1.0.0</p>
      <a
        href="https://yourwebsite.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        Visit our website
      </a>
    </div>
  );
}