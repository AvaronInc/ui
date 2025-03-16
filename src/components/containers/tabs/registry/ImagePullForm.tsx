
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Registry } from '@/types/containers';

interface ImagePullFormProps {
  registries: Registry[];
}

const ImagePullForm: React.FC<ImagePullFormProps> = ({ registries }) => {
  const [selectedRegistry, setSelectedRegistry] = useState<string>(registries.length > 0 ? registries[0].id : "");
  const [imageName, setImageName] = useState<string>("");

  const handlePullImage = () => {
    // In a real application, this would make an API call to pull the image
    console.log(`Pulling image ${imageName} from registry ${selectedRegistry}`);
  };

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
            <Select 
              value={selectedRegistry} 
              onValueChange={setSelectedRegistry}
              disabled={registries.length === 0}
            >
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
            <Input 
              placeholder="Image name (e.g. nginx:latest)" 
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
          </div>
          
          <div className="pt-2">
            <Button 
              className="w-full"
              onClick={handlePullImage}
              disabled={!selectedRegistry || !imageName}
            >
              Pull Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePullForm;
