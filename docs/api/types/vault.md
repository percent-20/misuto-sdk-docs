# Vault Types

## Vault

```typescript
interface Vault {
  id: string;
  uid: string;
  name: string;
  engine: EngineName;
  location: {
    geohash: string;
    altitude: number | null;
    radius: number;
  };
  is_public: boolean;
  always_visible: boolean;
  payload: Record<string, unknown>;
  webhook_url: string | null;
  track_visitors: boolean;
  created_via: string;
  created_at: string;
  updated_at: string;
  statistics?: {
    beacons_created: number;
  };
  shard_count?: number;
}
```

## VaultCreateParams

```typescript
interface VaultCreateParams {
  name: string;
  engine: EngineName;
  geohash: string;
  radius?: number;
  altitude?: number;
  payload?: Record<string, unknown>;
  webhook_url?: string;
  track_visitors?: boolean;
  is_public?: boolean;
  signals?: string[];
  constraints?: Record<string, unknown>;
}
```

## VaultUpdateParams

```typescript
interface VaultUpdateParams {
  name?: string;
  radius?: number;
  payload?: Record<string, unknown>;
  webhook_url?: string;
  track_visitors?: boolean;
  is_public?: boolean;
}
```

## VaultListParams

```typescript
interface VaultListParams {
  engine?: EngineName;
  page?: number;
  per_page?: number;
}
```

## NearbyParams

```typescript
interface NearbyParams {
  latitude: number;
  longitude: number;
  radius?: number;
}
```

## VaultCreateV3Params

Parameters for creating a vault with pre-computed hashes (V3 API):

```typescript
interface VaultCreateV3Params {
  name: string;
  engine: EngineName;
  vault_hashes: string[];
  radius?: number;
  payload?: Record<string, unknown>;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Vault name |
| `engine` | `EngineName` | Engine type |
| `vault_hashes` | `string[]` | Pre-computed SHA-256 hashes from `buildVaultHashes()` |
| `radius` | `number` | Optional radius in meters |
| `payload` | `Record<string, unknown>` | Optional engine-specific data |

:::note
No signal fields (geohash, salt, pepper, wifi_ssids, ble_device_names, etc.) are accepted. All hashing is done client-side via `buildVaultHashes()`.
:::

## DiscoveredVault

Returned by the sentinel endpoint during discovery:

```typescript
interface DiscoveredVault {
  uid: string;
  name: string;
  engine: EngineName;
  payload: Record<string, unknown>;
  access_token?: string;
  created_at: string;
}
```
