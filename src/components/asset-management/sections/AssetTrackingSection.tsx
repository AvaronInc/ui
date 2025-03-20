
import React, { useState } from 'react';
import AssetTable from '../components/AssetTable';
import AssetDetailPanel from '../components/AssetDetailPanel';
import AssetSearchBar from '../components/AssetSearchBar';
import { mockAssets } from '../data/mockAssetData';

const AssetTrackingSection = () => {
  const [selectedAsset, setSelectedAsset] = useState<null | { id: string; name: string; }>(null);
  
  const handleAssetClick = (asset: { id: string; name: string; }) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <AssetSearchBar />
        <AssetTable assets={mockAssets} onAssetClick={handleAssetClick} />
      </div>
      <div>
        <AssetDetailPanel selectedAsset={selectedAsset} />
      </div>
    </div>
  );
};

export default AssetTrackingSection;
