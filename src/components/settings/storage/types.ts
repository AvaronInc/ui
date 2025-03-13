
export interface StorageSettingsFormValues {
  maxFileUploadSize: number;
  allowedFileTypes: string[];
  deleteOldFilesAfter: string;
  enableDataRedundancy: boolean;
  // MinIO credentials
  minioApiKey: string;
  minioUsername: string;
  minioPassword: string;
  // Storage protection features
  enableImmutableStorage: boolean;
  enableRansomwareProtection: boolean;
  // S3 bucket connection for ransomware protection
  s3BucketName: string;
  s3AccessKey: string;
  s3SecretKey: string;
  s3Endpoint: string;
  s3Region: string;
}

export const defaultStorageSettings: StorageSettingsFormValues = {
  maxFileUploadSize: 100,
  allowedFileTypes: ['pdfs', 'images', 'documents'],
  deleteOldFilesAfter: '90',
  enableDataRedundancy: true,
  // Default MinIO credentials (empty)
  minioApiKey: '',
  minioUsername: '',
  minioPassword: '',
  // Default protection features
  enableImmutableStorage: false,
  enableRansomwareProtection: false,
  // Default S3 bucket connection
  s3BucketName: '',
  s3AccessKey: '',
  s3SecretKey: '',
  s3Endpoint: '',
  s3Region: 'us-east-1',
};

export const fileTypeOptions = [
  { id: 'pdfs', label: 'PDFs' },
  { id: 'images', label: 'Images' },
  { id: 'executables', label: 'Executables' },
  { id: 'documents', label: 'Documents' },
  { id: 'archives', label: 'Archives' },
];
