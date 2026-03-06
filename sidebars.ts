import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gettingStartedSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/configuration',
        'getting-started/provider-setup',
        'getting-started/first-vault',
      ],
    },
  ],

  guidesSidebar: [
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'guides/vault-discovery',
        'guides/sensors',
        'guides/signal-hashing',
        'guides/beacons',
      ],
    },
    {
      type: 'category',
      label: 'Vault Engines',
      collapsed: false,
      items: [
        'guides/real-time-chat',
        'guides/file-storage',
        'guides/mfa',
      ],
    },
    {
      type: 'category',
      label: 'Enterprise',
      items: [
        'guides/enterprise-sso',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'guides/emergency-exit',
        'guides/error-handling',
        'guides/rate-limits',
      ],
    },
  ],

  apiSidebar: [
    {
      type: 'category',
      label: 'Core Classes',
      collapsed: false,
      items: [
        'api/core/misuto-client',
        'api/core/http-client',
        'api/core/vault-discovery',
        'api/core/vault-interaction',
        'api/core/chat-client',
        'api/core/sensor-manager',
        'api/core/event-emitter',
      ],
    },
    {
      type: 'category',
      label: 'React Hooks',
      collapsed: false,
      items: [
        'api/hooks/use-misuto',
        'api/hooks/use-sensors',
        'api/hooks/use-vault-discovery',
        'api/hooks/use-vault-chat',
        'api/hooks/use-shake-detector',
        'api/hooks/use-rate-limits',
      ],
    },
    {
      type: 'category',
      label: 'API Endpoints',
      items: [
        'api/endpoints/vaults',
        'api/endpoints/beacons',
        'api/endpoints/sentinel',
        'api/endpoints/access-tokens',
        'api/endpoints/uploads',
        'api/endpoints/mfa-vaults',
        'api/endpoints/statistics',
        'api/endpoints/object-detection',
      ],
    },
    {
      type: 'category',
      label: 'Enterprise',
      items: [
        'api/enterprise/enterprise-mfa',
        'api/enterprise/providers',
        'api/enterprise/connections',
        'api/enterprise/admin',
      ],
    },
    {
      type: 'category',
      label: 'Type Definitions',
      items: [
        'api/types/vault',
        'api/types/beacon',
        'api/types/sensor',
        'api/types/discovery',
        'api/types/chat',
        'api/types/common',
        'api/types/enterprise',
        'api/types/api-response',
        'api/types/hashing',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'api/reference/constants',
        'api/reference/errors',
        'api/reference/beacon-policy',
        'api/reference/hashing',
        'api/reference/geohash',
      ],
    },
  ],

  useCasesSidebar: [
    'use-cases/overview',
    {
      type: 'category',
      label: 'Industries',
      collapsed: false,
      items: [
        'use-cases/gaming',
        'use-cases/healthcare',
        'use-cases/retail',
        'use-cases/real-estate',
        'use-cases/logistics',
        'use-cases/education',
        'use-cases/government',
      ],
    },
  ],
};

export default sidebars;
