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

#### Payload Examples by Engine

**STORAGE** — File storage vault. No payload required at creation; files are uploaded separately.

```typescript
await client.vaults.create({
  name: 'Team Documents',
  engine: 'storage',
  geohash: 'u4pruydqqvj8',
  radius: 50,
});
```

**WEBHOOK** — Fires an HTTP request to a URL when a user enters or exits.

```typescript
await client.vaults.create({
  name: 'Office Check-in',
  engine: 'webhook',
  geohash: 'u4pruydqqvj8',
  radius: 100,
  webhook_url: 'https://example.com/hooks/checkin',
});
```

**PAYLOAD** — Returns a custom data object to the discovering user.

```typescript
await client.vaults.create({
  name: 'Promo Data',
  engine: 'payload',
  geohash: 'u4pruydqqvj8',
  radius: 200,
  payload: {
    coupon_code: 'SAVE20',
    message: 'Welcome! Enjoy 20% off.',
    expires_at: '2026-12-31',
  },
});
```

**MESSAGE** — Delivers a preset message to the discovering user.

```typescript
await client.vaults.create({
  name: 'Welcome Message',
  engine: 'message',
  geohash: 'u4pruydqqvj8',
  radius: 50,
  payload: {
    text: 'Welcome to the museum! Ask the front desk for a free audio guide.',
  },
});
```

**CHAT** — Real-time conversation room via WebSocket.

```typescript
await client.vaults.create({
  name: 'Lobby Chat',
  engine: 'chat',
  geohash: 'u4pruydqqvj8',
  radius: 100,
});
```

**REWARD** — Rewards the first N unique visitors.

```typescript
await client.vaults.create({
  name: 'Early Bird Reward',
  engine: 'reward',
  geohash: 'u4pruydqqvj8',
  radius: 50,
  track_visitors: true,
});
```

**MFA** — Location-based multi-factor authentication vault.

```typescript
await client.vaults.create({
  name: 'Office MFA',
  engine: 'mfa',
  geohash: 'u4pruydqqvj8',
  radius: 100,
  payload: {
    instance_id: '550e8400-e29b-41d4-a716-446655440000',
    instance_name: 'Corporate SSO',
  },
});
```

**DEADROP** — Self-destructing single-file vault. First open consumes it.

```typescript
await client.vaults.create({
  name: 'Secret Document',
  engine: 'deadrop',
  geohash: 'u4pruydqqvj8',
  radius: 25,
  payload: {
    ttl: 300, // viewing window in seconds (5 minutes)
  },
});
// After creation, upload the file via the uploads API
```

**CRYPTO** — Bitcoin wallet with 2-of-2 multisig. The server generates its key pair and returns the multisig address.

```typescript
await client.vaults.create({
  name: 'BTC Wallet',
  engine: 'crypto',
  geohash: 'u4pruydqqvj8',
  radius: 100,
  payload: {
    public_address: '02a1633cafcc01ebfb6d78e39f687a1f0995c62fc95f51ead10a02ee0be551b5dc',
    network: 'mainnet',
    spending_limit_sats: 100000,
  },
});
// Response includes: multisig_address, server_pubkey, witness_script
```

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

#### V3 Payload Examples by Engine

All examples below assume hashes are pre-built:

```typescript
import { buildVaultHashes } from '@percent20/misuto-react-native-sdk';

const hashes = buildVaultHashes({
  geohash: 'u4pruydqqvj8',
  radius: 100,
  salt: 'device-salt',
  pepper: 'device-pepper',
});
```

**STORAGE** — File storage vault.

```typescript
await client.vaults.createV3({
  name: 'Team Documents',
  engine: 'storage',
  vault_hashes: hashes,
  radius: 50,
});
```

**WEBHOOK** — Fires an HTTP request on enter/exit. Pass `webhook_url` inside `payload`.

```typescript
await client.vaults.createV3({
  name: 'Office Check-in',
  engine: 'webhook',
  vault_hashes: hashes,
  radius: 100,
  payload: {
    webhook_url: 'https://example.com/hooks/checkin',
  },
});
```

**PAYLOAD** — Returns custom data to the discovering user.

```typescript
await client.vaults.createV3({
  name: 'Promo Data',
  engine: 'payload',
  vault_hashes: hashes,
  radius: 200,
  payload: {
    coupon_code: 'SAVE20',
    message: 'Welcome! Enjoy 20% off.',
    expires_at: '2026-12-31',
  },
});
```

**MESSAGE** — Delivers a preset message.

```typescript
await client.vaults.createV3({
  name: 'Welcome Message',
  engine: 'message',
  vault_hashes: hashes,
  radius: 50,
  payload: {
    text: 'Welcome to the museum! Ask the front desk for a free audio guide.',
  },
});
```

**CHAT** — Real-time conversation room.

```typescript
await client.vaults.createV3({
  name: 'Lobby Chat',
  engine: 'chat',
  vault_hashes: hashes,
  radius: 100,
});
```

**REWARD** — Rewards the first N unique visitors.

```typescript
await client.vaults.createV3({
  name: 'Early Bird Reward',
  engine: 'reward',
  vault_hashes: hashes,
  radius: 50,
});
```

**MFA** — Location-based multi-factor authentication.

```typescript
await client.vaults.createV3({
  name: 'Office MFA',
  engine: 'mfa',
  vault_hashes: hashes,
  radius: 100,
  payload: {
    instance_id: '550e8400-e29b-41d4-a716-446655440000',
    instance_name: 'Corporate SSO',
  },
});
```

**DEADROP** — Self-destructing single-file vault.

```typescript
await client.vaults.createV3({
  name: 'Secret Document',
  engine: 'deadrop',
  vault_hashes: hashes,
  radius: 25,
  payload: {
    ttl: 300,
  },
});
// After creation, upload the file via the uploads API
```

**CRYPTO** — Bitcoin wallet with 2-of-2 multisig.

```typescript
await client.vaults.createV3({
  name: 'BTC Wallet',
  engine: 'crypto',
  vault_hashes: hashes,
  radius: 100,
  payload: {
    public_address: '02a1633cafcc01ebfb6d78e39f687a1f0995c62fc95f51ead10a02ee0be551b5dc',
    network: 'mainnet',
    spending_limit_sats: 100000,
  },
});
// Response includes: multisig_address, server_pubkey, witness_script
```
