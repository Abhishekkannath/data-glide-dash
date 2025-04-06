
import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/utils/urlParser';

interface AreaChartProps {
  title: string;
  description?: string;
  data: ChartData;
}

const AreaChart: React.FC<AreaChartProps> = ({ title, description, data }) => {
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
            <RechartsAreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {data.datasets.map((dataset, index) => (
                  <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataset.color || "#8884d8"} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={dataset.color || "#8884d8"} stopOpacity={0.1}/>
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              {data.datasets.map((dataset, index) => (
                <Area 
                  key={index}
                  type="monotone" 
                  dataKey={dataset.name} 
                  stroke={dataset.color || "#8884d8"} 
                  fillOpacity={1} 
                  fill={`url(#color${index})`} 
                />
              ))}
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(AreaChart);
