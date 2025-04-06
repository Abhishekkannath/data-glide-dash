
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface DashboardHelpProps {
  onClose: () => void;
}

const DashboardHelp: React.FC<DashboardHelpProps> = ({ onClose }) => {
  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>How to Use URL Parameters</CardTitle>
          <CardDescription>Customize your dashboard by passing data through the URL</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Data Format</h3>
            <p className="text-sm text-muted-foreground">Each chart accepts JSON data through URL parameters with this structure:</p>
            <pre className="bg-muted p-2 rounded-md text-xs mt-1 overflow-x-auto">
{`{
  "labels": ["Label1", "Label2", "Label3"],
  "datasets": [
    {
      "name": "Dataset Name",
      "data": [10, 20, 30],
      "color": "#hexcolor" (optional)
    }
  ]
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1">URL Parameters</h3>
            <p className="text-sm text-muted-foreground">Add parameters to the URL for each chart type:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-2 mt-1">
              <li>line - Line chart data</li>
              <li>bar - Bar chart data</li>
              <li>pie - Pie chart data</li>
              <li>area - Area chart data</li>
              <li>scatter - Scatter plot data</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1">Example</h3>
            <p className="text-sm text-muted-foreground mb-1">Add this to your URL:</p>
            <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
              ?line={JSON.stringify({"labels":["Jan","Feb","Mar"],"datasets":[{"name":"Sales","data":[10,20,30]}]})}
            </pre>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="outline" onClick={() => {
          const demoUrl = window.location.origin + window.location.pathname;
          window.location.href = demoUrl;
        }}>
          Reset to Default Demo Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardHelp;
