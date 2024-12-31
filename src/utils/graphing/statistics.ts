export function calculateStatistics(data: number[]) {
  if (data.length === 0) return null;

  const sorted = [...data].sort((a, b) => a - b);
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / data.length;
  
  // Calculate median
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];

  // Calculate mode
  const counts = new Map<number, number>();
  let maxCount = 0;
  data.forEach(num => {
    const count = (counts.get(num) || 0) + 1;
    counts.set(num, count);
    maxCount = Math.max(maxCount, count);
  });
  const mode = Array.from(counts.entries())
    .filter(([_, count]) => count === maxCount)
    .map(([num]) => num);

  // Calculate standard deviation
  const squareDiffs = data.map(value => Math.pow(value - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / data.length;
  const stdDev = Math.sqrt(avgSquareDiff);

  // Calculate quartiles
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;

  return {
    mean,
    median,
    mode,
    stdDev,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    count: data.length,
    variance: avgSquareDiff,
    range: sorted[sorted.length - 1] - sorted[0],
    q1,
    q2: median,
    q3,
    iqr
  };
}

export function createHistogramData(data: number[], bins: number) {
  if (data.length === 0) return [];

  const min = Math.min(...data);
  const max = Math.max(...data);
  const binWidth = (max - min) / bins;
  
  const histogram = Array(bins).fill(0);
  
  data.forEach(value => {
    const binIndex = Math.min(
      Math.floor((value - min) / binWidth),
      bins - 1
    );
    histogram[binIndex]++;
  });

  return histogram.map((count, i) => ({
    start: min + i * binWidth,
    end: min + (i + 1) * binWidth,
    count,
    frequency: count / data.length
  }));
}