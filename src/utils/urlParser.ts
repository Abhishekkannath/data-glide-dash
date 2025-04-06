
export type ChartData = {
  labels: string[];
  datasets: {
    name: string;
    data: number[];
    color?: string;
  }[];
};

// Parse URL query parameters
export const parseUrlParams = (): Record<string, string> => {
  const params: Record<string, string> = {};
  const queryString = window.location.search;
  
  if (!queryString) return params;
  
  const urlParams = new URLSearchParams(queryString);
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
};

// Create demo data if no params are provided
export const getChartData = (chartType: string, params: Record<string, string>): ChartData => {
  // Check if there's specific data for this chart
  const chartParam = params[chartType];
  
  if (chartParam) {
    try {
      return JSON.parse(decodeURIComponent(chartParam));
    } catch (e) {
      console.error(`Error parsing ${chartType} data:`, e);
    }
  }
  
  // Default/demo data for each chart type
  switch (chartType) {
    case 'line':
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            name: 'Sales 2023',
            data: [30, 40, 35, 50, 49, 60],
            color: '#3b82f6'
          },
          {
            name: 'Sales 2022',
            data: [20, 25, 30, 45, 40, 50],
            color: '#a855f7'
          }
        ]
      };
    
    case 'bar':
      return {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        datasets: [
          {
            name: 'Revenue',
            data: [12000, 19000, 3000, 5000, 2000],
            color: '#14b8a6'
          }
        ]
      };
    
    case 'pie':
      return {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
          {
            name: 'Traffic Source',
            data: [55, 35, 10],
            color: '#6366f1'
          }
        ]
      };
    
    case 'area':
      return {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            name: 'Users',
            data: [500, 800, 1400, 1800, 2400, 3000],
            color: '#ec4899'
          }
        ]
      };
    
    case 'scatter':
      return {
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5', 'Point 6', 'Point 7'],
        datasets: [
          {
            name: 'Dataset 1',
            data: [5, 10, 15, 20, 25, 30, 35],
            color: '#f97316'
          },
          {
            name: 'Dataset 2',
            data: [7, 14, 8, 25, 22, 18, 30],
            color: '#eab308'
          }
        ]
      };
    
    default:
      return {
        labels: ['A', 'B', 'C', 'D', 'E'],
        datasets: [
          {
            name: 'Default',
            data: [10, 20, 30, 40, 50],
            color: '#22c55e'
          }
        ]
      };
  }
};

// Function to create a demo URL
export const getDemoUrl = (): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        name: 'Revenue',
        data: [40, 58, 45, 70, 65, 85],
        color: '#3b82f6'
      },
      {
        name: 'Expenses',
        data: [25, 30, 40, 35, 45, 55],
        color: '#f97316'
      }
    ]
  };
  
  const barData = {
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    datasets: [
      {
        name: 'Projects Completed',
        data: [15, 22, 8, 17, 12],
        color: '#14b8a6'
      }
    ]
  };
  
  return `${baseUrl}?line=${encodeURIComponent(JSON.stringify(lineData))}&bar=${encodeURIComponent(JSON.stringify(barData))}`;
};
