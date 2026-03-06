# Provider Setup

The `<MisutoProvider>` component initializes the SDK and makes the `MisutoClient` available to all child components via React Context.

## Basic Setup

Wrap your app (or the relevant subtree) with `<MisutoProvider>`:

```tsx
import React from 'react';
import { MisutoProvider } from '@percent20/misuto-react-native-sdk';

export default function App() {
  return (
    <MisutoProvider apiKey="pk_live_abc123">
      <YourApp />
    </MisutoProvider>
  );
}
```

## With Configuration

Pass additional config via the `config` prop:

```tsx
<MisutoProvider
  apiKey="pk_live_abc123"
  config={{
    sensors: { gps: true, ble: true },
    discovery: {
      pollingIntervalMs: 3000,
      salt: deviceSalt,
      pepper: devicePepper,
    },
    logLevel: 'info',
  }}
>
  <YourApp />
</MisutoProvider>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your API key |
| `config` | `Omit<MisutoConfig, 'apiKey'>` | No | SDK configuration (sensors, discovery, logLevel, baseUrl) |
| `children` | `ReactNode` | Yes | Child components |

## How It Works

1. On first render, calls `MisutoClient.init({ ...config, apiKey })`
2. Stores the singleton instance in a ref
3. Provides it via `MisutoContext`
4. On unmount, calls `client.destroy()` to clean up sensors and polling

## Accessing the Client

Use the `useMisuto()` hook in any child component:

```tsx
import { useMisuto } from '@percent20/misuto-react-native-sdk';

function MyComponent() {
  const client = useMisuto();

  // Access any subsystem
  const stats = await client.statistics.get();
  const vaults = await client.vaults.list();
}
```

## Direct Initialization

If you're not using React, initialize directly:

```typescript
import { MisutoClient } from '@percent20/misuto-react-native-sdk';

const client = MisutoClient.init({ apiKey: 'pk_live_abc123' });

// Later, get the singleton anywhere
const same = MisutoClient.getInstance();

// Clean up
client.destroy();
```

## Next Steps

- [Your First Vault](/getting-started/first-vault) — create, discover, and interact with a vault
