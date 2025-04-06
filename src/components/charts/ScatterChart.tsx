
import React from 'react';
import { ResponsiveContainer, ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/utils/urlParser';

interface ScatterChartProps {
  title: string;
  description?: string;
  data: ChartData;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ title, description, data }) => {
  // Transform data for recharts - for scatter charts, we need to create points with x/y coordinates
  const transformedData = data.datasets.map(dataset => {
    return {
      name: dataset.name,
      color: dataset.color,
      data: dataset.data.map((value, index) => {
        return {
          x: index + 1, // X-axis could be the index or any other value
          y: value,     // Y-axis is the actual data value
          z: 10,        // Size of the point (optional)
        };
      })
    };
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Index" 
                tick={{ fontSize: 12 }} 
                domain={[0, Math.max(...data.datasets.map(ds => ds.data.length))]}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Value" 
                tick={{ fontSize: 12 }} 
                domain={['auto', 'auto']}
              />
              <ZAxis type="number" range={[60, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [value, name === 'y' ? 'Value' : 'Index']} />
              <Legend />
              {transformedData.map((dataset, index) => (
                <Scatter 
                  key={index} 
                  name={dataset.name} 
                  data={dataset.data} 
                  fill={dataset.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                />
              ))}
            </RechartsScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScatterChart;
