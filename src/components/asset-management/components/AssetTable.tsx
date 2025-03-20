
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AssetTableProps {
  assets: any[];
  onAssetClick: (asset: { id: string; name: string }) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ assets, onAssetClick }) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "In Maintenance": return "warning";  
      case "Retired": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="hidden md:table-cell">Manufacturer</TableHead>
            <TableHead className="hidden md:table-cell">Model/Serial</TableHead>
            <TableHead className="hidden lg:table-cell">Purchase Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow 
              key={asset.id}
              className="cursor-pointer hover:bg-muted/80"
              onClick={() => onAssetClick(asset)}
            >
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell className="hidden md:table-cell">{asset.manufacturer}</TableCell>
              <TableCell className="hidden md:table-cell">
                {asset.model}
                <div className="text-xs text-muted-foreground">SN: {asset.serial}</div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{asset.purchaseDate}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(asset.status)}>
                  {asset.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetTable;
