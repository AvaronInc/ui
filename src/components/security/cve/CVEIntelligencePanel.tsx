
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CVEOverview from './tabs/CVEOverview';
import AffectedSystems from './tabs/AffectedSystems';
import ZeroDayWatchlist from './tabs/ZeroDayWatchlist';
import PatchRecommendations from './tabs/PatchRecommendations';
import SearchAnalyze from './tabs/SearchAnalyze';
import CVESettingsDialog from './dialogs/CVESettingsDialog';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CVEIntelligencePanel = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">CVE Intelligence</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="affected-systems">Affected Systems</TabsTrigger>
          <TabsTrigger value="zero-day">Zero-Day Watchlist</TabsTrigger>
          <TabsTrigger value="patches">Patch Recommendations</TabsTrigger>
          <TabsTrigger value="search">Search & Analyze</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CVEOverview />
        </TabsContent>

        <TabsContent value="affected-systems">
          <AffectedSystems />
        </TabsContent>

        <TabsContent value="zero-day">
          <ZeroDayWatchlist />
        </TabsContent>

        <TabsContent value="patches">
          <PatchRecommendations />
        </TabsContent>

        <TabsContent value="search">
          <SearchAnalyze />
        </TabsContent>
      </Tabs>

      <CVESettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default CVEIntelligencePanel;
