
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";

const AssetSearchBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search assets..." 
          className="pl-8"
        />
      </div>
      <Button size="sm">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Asset
      </Button>
    </div>
  );
};

export default AssetSearchBar;
