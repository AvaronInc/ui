
import { ChangeStatus } from '@/types/change-management';
import { ReactNode } from 'react';

export interface LifecycleStage {
  status: ChangeStatus;
  label: string;
  icon: ReactNode;
  description: string;
}
