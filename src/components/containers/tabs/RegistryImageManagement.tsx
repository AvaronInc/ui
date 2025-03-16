
import React from 'react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';
import { RegistryConnections, ImagePullForm, ContainerImagesTable } from './registry';
import { Registry } from '@/types/containers';

const RegistryImageManagement = () => {
  const { images, registries } = useContainersData();
  
  // Make sure registries conform to the Registry type
  const typedRegistries: Registry[] = registries.map(registry => ({
    ...registry,
    status: registry.status as "connected" | "disconnected" | "error"
  }));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RegistryConnections registries={typedRegistries} />
        <ImagePullForm registries={typedRegistries} />
      </div>
      
      <ContainerImagesTable images={images} registries={typedRegistries} />
    </div>
  );
};

export default RegistryImageManagement;
