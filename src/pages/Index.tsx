
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { parseUrlParams, getChartData } from '@/utils/urlParser';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardHelp from '@/components/DashboardHelp';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load chart components
const LineChart = lazy(() => import('@/components/charts/LineChart'));
const BarChart = lazy(() => import('@/components/charts/BarChart'));
const PieChart = lazy(() => import('@/components/charts/PieChart'));
const AreaChart = lazy(() => import('@/components/charts/AreaChart'));
const ScatterChart = lazy(() => import('@/components/charts/ScatterChart'));

// Loading placeholder component
const ChartSkeleton = () => (
  <Card className="w-full">
    <CardContent className="p-6">
      <Skeleton className="h-[300px] w-full rounded-md" />
    </CardContent>
  </Card>
);

const Index = () => {
  const [params, setParams] = useState<Record<string, string>>({});
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const urlParams = parseUrlParams();
      setParams(urlParams);
      
      // Show help by default if no parameters are provided
      if (Object.keys(urlParams).length === 0) {
        setShowHelp(true);
      }
      
      // Simulate a small delay to prevent flash of loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };
    
    fetchData();
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
            <Suspense fallback={<ChartSkeleton />}>
              {!isLoading && (
                <LineChart 
                  title="Line Chart" 
                  description="Time series data visualization"
                  data={getChartData('line', params)} 
                />
              )}
            </Suspense>
            
            <Suspense fallback={<ChartSkeleton />}>
              {!isLoading && (
                <BarChart 
                  title="Bar Chart" 
                  description="Compare values across categories"
                  data={getChartData('bar', params)} 
                />
              )}
            </Suspense>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Suspense fallback={<ChartSkeleton />}>
              {!isLoading && (
                <PieChart 
                  title="Pie Chart" 
                  description="Distribution breakdown"
                  data={getChartData('pie', params)} 
                />
              )}
            </Suspense>
            
            <Suspense fallback={<ChartSkeleton />}>
              {!isLoading && (
                <AreaChart 
                  title="Area Chart" 
                  description="Cumulative value trends"
                  data={getChartData('area', params)} 
                />
              )}
            </Suspense>
            
            <Suspense fallback={<ChartSkeleton />}>
              {!isLoading && (
                <ScatterChart 
                  title="Scatter Plot" 
                  description="Correlation analysis"
                  data={getChartData('scatter', params)} 
                />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
