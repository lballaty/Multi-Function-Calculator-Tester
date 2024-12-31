import React from 'react';

interface StatisticsTableProps {
  stats: {
    count: number;
    mean: number;
    median: number;
    mode: number[];
    stdDev: number;
    min: number;
    max: number;
    variance: number;
    range: number;
    q1: number;
    q2: number;
    q3: number;
    iqr: number;
  } | null;
}

export default function StatisticsTable({ stats }: StatisticsTableProps) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Count:</span>
          <span>{stats.count}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Mean:</span>
          <span>{stats.mean.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Median (Q2):</span>
          <span>{stats.median.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Mode:</span>
          <span>{stats.mode.map(m => m.toFixed(4)).join(', ')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Q1:</span>
          <span>{stats.q1.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Q3:</span>
          <span>{stats.q3.toFixed(4)}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Standard Deviation:</span>
          <span>{stats.stdDev.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Variance:</span>
          <span>{stats.variance.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Range:</span>
          <span>{stats.range.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">IQR:</span>
          <span>{stats.iqr.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Min/Max:</span>
          <span>{stats.min.toFixed(4)} / {stats.max.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}