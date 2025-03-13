
# StorageSettings Architecture

This document provides an overview of the Storage Settings components architecture and how they interact with each other.

## Component Structure

The Storage Settings section has been refactored into several smaller, focused components:

```
src/components/settings/storage/
├── types.ts                  # Shared types and constants
├── useStorageSettings.ts     # Custom hook for form state management
├── MinioCredentials.tsx      # MinIO authentication configuration
├── StorageAccessControl.tsx  # File upload limits and type restrictions
├── ProtectionFeatures.tsx    # Data protection toggles
├── S3BucketConnection.tsx    # S3 bucket configuration (for ransomware protection)
├── RetentionPolicy.tsx       # File retention and data redundancy settings
└── README.md                 # This documentation file
```

## Data Flow

![Data Flow Diagram]

1. The main `StorageSettings.tsx` component uses the `useStorageSettings` hook to manage form state.
2. The hook handles loading saved settings from localStorage and saving updated settings.
3. The form state and save handler are passed to child components.
4. Child components receive the form context and can read/update form values.

## Component Responsibilities

### 1. StorageSettings.tsx (Parent Component)
- Acts as the container for all storage settings sections
- Imports and arranges all child components
- Provides form context to all children
- Controls the "Save Changes" button that persists all settings

### 2. useStorageSettings.ts (Custom Hook)
- Manages form state using react-hook-form
- Loads saved settings from localStorage
- Provides form validation
- Handles saving settings to localStorage
- Displays success toast notifications

### 3. types.ts (Shared Types)
- Defines the `StorageSettingsFormValues` interface
- Provides default values for all settings
- Defines file type options for the allowed file types checkboxes

### 4. MinioCredentials.tsx
- Renders inputs for MinIO authentication credentials:
  - MinIO Username
  - MinIO Password
  - MinIO API Key
- All credential fields are masked for security

### 5. StorageAccessControl.tsx
- Manages file upload size limits
- Provides checkboxes for restricting allowed file types

### 6. ProtectionFeatures.tsx
- Toggle for Immutable Storage feature
- Toggle for Ransomware Protection feature
- When Ransomware Protection is enabled, it triggers the display of S3BucketConnection

### 7. S3BucketConnection.tsx
- Only displayed when ransomware protection is enabled
- Provides configuration fields for S3-compatible storage:
  - Bucket Name
  - Region (dropdown)
  - Endpoint URL
  - Access Key
  - Secret Key
- Fields are designed specifically for Wasabi S3-compatible storage

### 8. RetentionPolicy.tsx
- Controls automatic file deletion settings
- Toggle for data redundancy backups

## State Management

The form state is managed using react-hook-form, which:

1. Initializes with values from localStorage or defaults
2. Provides controlled inputs that update the form state
3. Handles form validation
4. Saves all values to localStorage when the user clicks "Save Changes"

## Conditional Rendering

The S3BucketConnection component is conditionally rendered based on the `enableRansomwareProtection` toggle value. This is achieved by:

```tsx
<S3BucketConnection 
  form={form} 
  visible={form.watch('enableRansomwareProtection')} 
/>
```

The component internally checks the `visible` prop and returns null if not visible.

## Future Improvements

Potential improvements to consider:

1. Adding form validation for required fields and format validation for S3 credentials
2. Implementing real API integration instead of localStorage persistence
3. Adding error handling for failed save operations
4. Providing test coverage for components and hooks
5. Enhancing accessibility features for form inputs
