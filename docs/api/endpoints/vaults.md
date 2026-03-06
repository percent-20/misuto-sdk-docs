# Vaults API

CRUD operations for vault management via `client.vaults`.

## Methods

### `list(params?)`

List vaults owned by the authenticated client.

```typescript
client.vaults.list(params?: VaultListParams): Promise<VaultsIndexResponse>
```

| Param | Type | Description |
|-------|------|-------------|
| `engine` | `EngineName` | Filter by engine type |
| `page` | `number` | Page number |
| `per_page` | `number` | Results per page |

**Route:** `GET /clients/vaults`

### `get(id)`

Get a single vault by ID.

```typescript
client.vaults.get(id: string): Promise<Vault>
```

**Route:** `GET /clients/vaults/:id`

### `create(params)`

Create a new vault.

```typescript
client.vaults.create(params: VaultCreateParams): Promise<VaultCreateResponse>
```

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Vault name |
| `engine` | `EngineName` | Yes | Engine type |
| `geohash` | `string` | Yes | Location geohash |
| `radius` | `number` | No | Radius in meters |
| `altitude` | `number` | No | Altitude in meters |
| `payload` | `Record<string, unknown>` | No | Engine-specific data |
| `webhook_url` | `string` | No | For WEBHOOK engine |
| `track_visitors` | `boolean` | No | Enable visitor tracking |
| `is_public` | `boolean` | No | Public visibility |
| `signals` | `string[]` | No | Required signal types |
| `constraints` | `Record<string, unknown>` | No | Access constraints |

**Route:** `POST /clients/vaults`

### `update(id, params)`

Update a vault.

```typescript
client.vaults.update(id: string, params: VaultUpdateParams): Promise<Vault>
```

**Route:** `PUT /clients/vaults/:id`

### `delete(id)`

Delete a vault.

```typescript
client.vaults.delete(id: string): Promise<void>
```

**Route:** `DELETE /clients/vaults/:id`

### `nearby(params)`

Find vaults near a location.

```typescript
client.vaults.nearby(params: NearbyParams): Promise<NearbyResponse>
```

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `latitude` | `number` | Yes | Latitude |
| `longitude` | `number` | Yes | Longitude |
| `radius` | `number` | No | Search radius in meters |

**Route:** `GET /clients/vaults/nearby`

---

### `createV3(params)`

Create a vault with pre-computed hashes (V3). Raw discovery signals never leave the device.

```typescript
client.vaults.createV3(params: VaultCreateV3Params): Promise<VaultCreateResponse>
```

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Vault name |
| `engine` | `EngineName` | Yes | Engine type |
| `vault_hashes` | `string[]` | Yes | Pre-computed SHA-256 hashes |
| `radius` | `number` | No | Radius in meters |
| `payload` | `Record<string, unknown>` | No | Engine-specific data |

**Route:** `POST /v3/clients/vaults`

:::tip Privacy-first
Unlike `create()`, this method accepts only pre-computed hashes — no geohash, salt, pepper, WiFi SSIDs, or BLE device names are sent to the server. Use [`buildVaultHashes()`](/api/reference/hashing#buildvaulthashes) to generate the hashes client-side.
:::

```typescript
import { buildVaultHashes } from '@percent20/misuto-react-native-sdk';

const hashes = buildVaultHashes({
  geohash: 'sv8wrqpg5',
  radius: 100,
  salt: 'device-salt-hash',
  pepper: 'device-pepper-hash',
  wifiSsids: ['OfficeWiFi'],
  bleDeviceNames: ['Beacon-01'],
});

const vault = await client.vaults.createV3({
  name: 'Private Vault',
  engine: 'storage',
  vault_hashes: hashes,
  radius: 100,
});
```

**Constraints:**

- `vault_hashes` must be a non-empty array of 64-character hex strings
- Maximum 10,000 hashes per vault
- Signal fields (`geohash`, `salt`, `pepper`, `wifi_ssids`, etc.) are **not accepted** — use `buildVaultHashes()` instead
