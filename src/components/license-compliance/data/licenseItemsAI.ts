
import { LicenseData } from '../types';

export const licenseItemsAI: LicenseData[] = [
  {
    id: '13',
    componentName: 'Mixtral',
    licenseType: 'Apache 2.0',
    licenseUrl: 'https://github.com/mistralai/mistral-src/blob/main/LICENSE',
    version: 'v0.1',
    source: 'mistralai.com',
    usedIn: ['AI/ML', 'Natural Language Processing'],
    riskLevel: 'Low',
    fullLicenseText: 'Apache License Version 2.0, January 2004...',
    usageDetails: {
      containerName: 'mixtral-inference',
      apiCalls: ['POST /v1/completions', 'POST /v1/chat/completions'],
      dependencies: ['PyTorch', 'CUDA']
    }
  },
  {
    id: '14',
    componentName: 'Avaron AI Engine',
    licenseType: 'Proprietary',
    licenseUrl: 'https://avaron.ai/license',
    version: 'v2.3.1',
    source: 'avaron.ai',
    usedIn: ['AI/ML', 'Security Analytics', 'Threat Detection'],
    riskLevel: 'Medium',
    fullLicenseText: 'Avaron AI Engine License. All rights reserved...',
    usageDetails: {
      containerName: 'avaron-engine',
      apiCalls: ['POST /api/analyze', 'GET /api/models', 'POST /api/predict'],
      dependencies: ['CUDA', 'TensorRT', 'cuDNN']
    }
  }
];
