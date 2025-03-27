
export const getDefaultConfigCode = (type: string) => {
  switch (type) {
    case 'network':
      return '{\n  "vlan": {\n    "id": 103,\n    "name": "Internal-Servers",\n    "subnet": "10.1.3.0/24",\n    "gateway": "10.1.3.1"\n  }\n}';
    case 'firewall':
      return '{\n  "rule": {\n    "name": "Allow Web Traffic",\n    "action": "allow",\n    "source": "any",\n    "destination": "10.1.3.0/24",\n    "port": 443,\n    "protocol": "tcp"\n  }\n}';
    case 'sdwan':
      return '{\n  "policy": {\n    "name": "Voice Traffic Priority",\n    "match": { "application": "voip" },\n    "action": { "priority": "high", "path": "mpls" }\n  }\n}';
    case 'dns':
      return '{\n  "record": {\n    "name": "api.internal",\n    "type": "A",\n    "value": "10.1.3.25",\n    "ttl": 300\n  }\n}';
    case 'identity':
      return '{\n  "group": {\n    "name": "Developer Access",\n    "permissions": ["code-repos", "ci-systems"],\n    "members": ["user1", "user2"]\n  }\n}';
    case 'software':
      return '{\n  "package": {\n    "name": "Security Gateway",\n    "version": "4.2.1",\n    "targets": ["firewall-*"],\n    "canary": true\n  }\n}';
    case 'custom':
      return '# Enter your custom configuration here\n# Supports YAML, JSON, or other formats';
    default:
      return '{\n  // Enter your configuration here\n}';
  }
};
