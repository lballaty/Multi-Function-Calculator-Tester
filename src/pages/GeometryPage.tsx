import React from 'react';
import Shape2DCalculator from '../components/geometry/Shape2DCalculator';
import Shape3DCalculator from '../components/geometry/Shape3DCalculator';
import DocLink from '../components/DocLink';

export default function GeometryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <DocLink />
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <Shape2DCalculator />
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <Shape3DCalculator />
        </div>
      </div>
    </div>
  );
}