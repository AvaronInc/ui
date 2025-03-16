
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContainerImage, Registry } from '@/types/containers';

interface ContainerImagesTableProps {
  images: ContainerImage[];
  registries: Registry[];
}

const ContainerImagesTable: React.FC<ContainerImagesTableProps> = ({ images }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Container Images</CardTitle>
            <CardDescription>
              Manage your container images in connected registries
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Refresh</Button>
            <Button variant="outline">Filter</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Registry</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Vulnerabilities</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.id}>
                <TableCell className="font-medium">{image.name}</TableCell>
                <TableCell>{image.tag}</TableCell>
                <TableCell>{image.registry}</TableCell>
                <TableCell>{image.size}</TableCell>
                <TableCell>{image.created}</TableCell>
                <TableCell>
                  {image.vulnerabilities > 0 ? (
                    <Badge variant="destructive">{image.vulnerabilities}</Badge>
                  ) : (
                    <Badge variant="outline">0</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Deploy</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ContainerImagesTable;
