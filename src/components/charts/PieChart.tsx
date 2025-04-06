
import React from 'react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/utils/urlParser';

interface PieChartProps {
  title: string;
  description?: string;
  data: ChartData;
}

const PieChart: React.FC<PieChartProps> = ({ title, description, data }) => {
  // Transform data for recharts
  const chartData = data.labels.map((label, index) => {
    return {
      name: label,
      value: data.datasets[0].data[index]
    };
  });

  // Generate colors if not provided
  const COLORS = data.datasets[0].data.map((_, index) => {
    if (data.datasets[0].color) return data.datasets[0].color;
    
    const predefinedColors = [
      '#3b82f6', '#14b8a6', '#6366f1', '#a855f7', '#ec4899', 
      '#f97316', '#eab308', '#22c55e'
    ];
    
    return predefinedColors[index % predefinedColors.length];
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
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
