
export const getDefaultConfigCode = (type: string) => {
  switch (type) {
    case 'network':
      return '{\n  "vlan": {\n    "id": 103,\n    "name": "Internal-Servers",\n    "subnet": "10.1.3.0/24",\n    "gateway": "10.1.3.1"\n  },\n  "dhcp": {\n    "enabled": true,\n    "range": {\n      "start": "10.1.3.100",\n      "end": "10.1.3.200"\n    },\n    "reservations": [\n      {\n        "mac": "00:1A:2B:3C:4D:5E",\n        "ip": "10.1.3.25",\n        "hostname": "api-server-1"\n      }\n    ]\n  }\n}';
    case 'firewall':
      return '{\n  "rules": [\n    {\n      "name": "Allow Web Traffic",\n      "action": "allow",\n      "source": "any",\n      "destination": "10.1.3.0/24",\n      "port": 443,\n      "protocol": "tcp",\n      "logging": true\n    },\n    {\n      "name": "Block Malicious IPs",\n      "action": "deny",\n      "source": "209.85.164.0/24",\n      "destination": "any",\n      "port": "any",\n      "protocol": "any"\n    }\n  ]\n}';
    case 'sdwan':
      return '{\n  "policies": [\n    {\n      "name": "Voice Traffic Priority",\n      "match": { \n        "application": "voip",\n        "dscp": "ef"\n      },\n      "action": { \n        "priority": "high", \n        "path": "mpls",\n        "qos": "guaranteed-bandwidth"\n      }\n    },\n    {\n      "name": "Backup Traffic Route",\n      "match": { \n        "application": "database-sync",\n        "time": "22:00-04:00"\n      },\n      "action": { \n        "priority": "medium", \n        "path": "internet-1",\n        "fallback": "internet-2"\n      }\n    }\n  ]\n}';
    case 'dns':
      return '{\n  "records": [\n    {\n      "name": "api.internal",\n      "type": "A",\n      "value": "10.1.3.25",\n      "ttl": 300\n    },\n    {\n      "name": "*.services.internal",\n      "type": "CNAME",\n      "value": "service-lb.internal",\n      "ttl": 600\n    },\n    {\n      "name": "mail.internal",\n      "type": "MX",\n      "value": "10 mailserver.internal",\n      "ttl": 3600\n    }\n  ],\n  "forwarders": [\n    {\n      "domain": "partner.com",\n      "servers": ["192.168.5.53", "192.168.5.54"]\n    }\n  ]\n}';
    case 'identity':
      return '{\n  "groups": [\n    {\n      "name": "Developer Access",\n      "permissions": ["code-repos", "ci-systems", "staging-env"],\n      "members": ["user1", "user2"],\n      "mfa_required": true\n    },\n    {\n      "name": "Network Admin",\n      "permissions": ["network-config", "firewall-rules", "routing-tables"],\n      "members": ["admin1"],\n      "ip_restrictions": ["10.0.0.0/8"]\n    }\n  ],\n  "access_policies": [\n    {\n      "name": "Off-hours Access",\n      "condition": "time >= 18:00 OR time <= 07:00 OR weekday IN [\"saturday\", \"sunday\"]",\n      "require_approval": true\n    }\n  ]\n}';
    case 'software':
      return '{\n  "package": {\n    "name": "Security Gateway",\n    "version": "4.2.1",\n    "targets": ["firewall-*"],\n    "canary": true,\n    "rollout": {\n      "strategy": "staged",\n      "initial_targets": ["firewall-lab-1", "firewall-lab-2"],\n      "monitoring_period": "24h",\n      "success_metrics": ["cpu < 80%", "memory < 75%", "error_rate < 0.1%"]\n    },\n    "rollback_plan": {\n      "automatic": true,\n      "conditions": ["cpu > 95%", "error_rate > 1%", "connection_failures > 100"]\n    }\n  }\n}';
    case 'custom':
      return '# Enter your custom configuration here\n# Supports YAML, JSON, or other formats\n\n# Example: Network and Security combined change\nnetwork:\n  vlan_id: 200\n  subnet: 10.2.0.0/24\n  gateway: 10.2.0.1\n\nsecurity:\n  firewall_rules:\n    - name: Allow Internal Traffic\n      action: allow\n      source: 10.2.0.0/24\n      destination: 10.0.0.0/8\n      port: any\n  encryption:\n    type: aes256\n    rotate_keys: weekly\n\nmonitoring:\n  alerts:\n    - condition: traffic > 1Gbps\n      notify: network-team@example.com';
    default:
      return '{\n  // Enter your configuration here\n}';
  }
};
