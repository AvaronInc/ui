
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Registry } from '@/types/containers';

interface ImagePullFormProps {
  registries: Registry[];
}

const ImagePullForm: React.FC<ImagePullFormProps> = ({ registries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pull Container Image</CardTitle>
        <CardDescription>
          Pull a new container image from a registry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <Select defaultValue={registries[0]?.id}>
              <SelectTrigger>
                <SelectValue placeholder="Select Registry" />
              </SelectTrigger>
              <SelectContent>
                {registries.map((registry) => (
                  <SelectItem key={registry.id} value={registry.id}>{registry.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Input placeholder="Image name (e.g. nginx:latest)" />
          </div>
          
          <div className="pt-2">
            <Button className="w-full">
              Pull Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePullForm;
