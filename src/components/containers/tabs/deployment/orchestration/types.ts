
export interface OrchestrationFormValues {
  orchestration: string;
  primaryNode: string;
  replicaCount: string;
  nodeAffinity: string;
  customServerIp?: string;
  customServerUsername?: string;
  customServerPassword?: string;
  customServerCertificate?: string;
  secondaryNode?: string;
  secondaryCustomServerIp?: string;
  secondaryCustomServerUsername?: string;
  secondaryCustomServerPassword?: string;
  secondaryCustomServerCertificate?: string;
}
