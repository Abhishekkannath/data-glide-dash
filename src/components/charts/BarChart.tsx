
import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/utils/urlParser';

interface BarChartProps {
  title: string;
  description?: string;
  data: ChartData;
}

const BarChart: React.FC<BarChartProps> = ({ title, description, data }) => {
  // Transform data for recharts with memoization
  const chartData = useMemo(() => {
    return data.labels.map((label, index) => {
      const dataPoint: Record<string, any> = { name: label };
      data.datasets.forEach(dataset => {
        dataPoint[dataset.name] = dataset.data[index];
      });
      return dataPoint;
    });
  }, [data]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Bar 
                  key={index} 
                  dataKey={dataset.name} 
                  fill={dataset.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(BarChart);
