
import React from 'react';
import { Button } from '@/components/ui/button';
import { getDemoUrl } from '@/utils/urlParser';
import { Clipboard, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DashboardHeader: React.FC = () => {
  const { toast } = useToast();

  const handleGenerateDemoUrl = () => {
    const demoUrl = getDemoUrl();
    navigator.clipboard.writeText(demoUrl).then(() => {
      toast({
        title: "Demo URL generated",
        description: "The URL has been copied to your clipboard",
      });
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 pb-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DataGlide Dashboard</h1>
        <p className="text-muted-foreground mt-1 mb-4 md:mb-0">
          Interactive data visualization with customizable charts via URL parameters
        </p>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={handleGenerateDemoUrl}
          className="flex items-center gap-1"
        >
          <Clipboard className="h-4 w-4" />
          <span>Copy Demo URL</span>
        </Button>
        <Button 
          variant="default"
          className="flex items-center gap-1"
          onClick={() => {
            toast({
              title: "Share dashboard",
              description: "Use the current URL to share this dashboard",
            });
          }}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
