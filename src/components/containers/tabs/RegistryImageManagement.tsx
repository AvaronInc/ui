
import React from 'react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';
import { RegistryConnections, ImagePullForm, ContainerImagesTable } from './registry';

const RegistryImageManagement = () => {
  const { images, registries } = useContainersData();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RegistryConnections registries={registries} />
        <ImagePullForm registries={registries} />
      </div>
      
      <ContainerImagesTable images={images} registries={registries} />
    </div>
  );
};

export default RegistryImageManagement;
