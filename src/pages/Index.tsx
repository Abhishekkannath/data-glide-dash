
import React, { useState, useEffect } from 'react';
import { parseUrlParams, getChartData } from '@/utils/urlParser';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import AreaChart from '@/components/charts/AreaChart';
import ScatterChart from '@/components/charts/ScatterChart';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardHelp from '@/components/DashboardHelp';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const Index = () => {
  const [params, setParams] = useState<Record<string, string>>({});
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const urlParams = parseUrlParams();
    setParams(urlParams);
    
    // Show help by default if no parameters are provided
    if (Object.keys(urlParams).length === 0) {
      setShowHelp(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4">
        <DashboardHeader />
        
        <div className="p-6">
          {!showHelp && (
            <div className="mb-6 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHelp(true)}
                className="flex items-center gap-1"
              >
                <HelpCircle className="h-4 w-4" />
                <span>How to Use</span>
              </Button>
            </div>
          )}
          
          {showHelp && (
            <DashboardHelp onClose={() => setShowHelp(false)} />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <LineChart 
              title="Line Chart" 
              description="Time series data visualization"
              data={getChartData('line', params)} 
            />
            <BarChart 
              title="Bar Chart" 
              description="Compare values across categories"
              data={getChartData('bar', params)} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <PieChart 
              title="Pie Chart" 
              description="Distribution breakdown"
              data={getChartData('pie', params)} 
            />
            <AreaChart 
              title="Area Chart" 
              description="Cumulative value trends"
              data={getChartData('area', params)} 
            />
            <ScatterChart 
              title="Scatter Plot" 
              description="Correlation analysis"
              data={getChartData('scatter', params)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
