# Beacons API

Beacon management via `client.beacons`.

## Methods

### `list(vaultId, params?)`

List beacons for a vault.

```typescript
client.beacons.list(vaultId: string, params?: BeaconListParams): Promise<BeaconsIndexResponse>
```

| Param | Type | Description |
|-------|------|-------------|
| `page` | `number` | Page number |
| `per_page` | `number` | Results per page |
| `status` | `'unredeemed' \| 'redeemed' \| 'expired'` | Filter by status |

**Route:** `GET /clients/vaults/:id/beacons`

### `get(vaultId, beaconId)`

Get a single beacon.

```typescript
client.beacons.get(vaultId: string, beaconId: string): Promise<Beacon>
```

**Route:** `GET /clients/vaults/:id/beacons/:beacon_id`

### `create(vaultId, params?)`

Create a beacon.

```typescript
client.beacons.create(vaultId: string, params?: BeaconCreateParams): Promise<Beacon>
```

| Param | Type | Description |
|-------|------|-------------|
| `name` | `string` | Beacon name |
| `type` | `'wormhole' \| 'conversation'` | Beacon type |
| `policy` | `BeaconPolicy` | Access policy |
| `send_to` | `{ method, destination }` | Send via SMS or email |

**Route:** `POST /clients/vaults/:id/beacons`

### `bulkCreate(vaultId, params)`

Create multiple beacons at once.

```typescript
client.beacons.bulkCreate(vaultId: string, params: BulkBeaconCreateParams): Promise<BulkBeaconResponse>
```

| Param | Type | Description |
|-------|------|-------------|
| `count` | `number` | Number of beacons |
| `type` | `'wormhole' \| 'conversation'` | Beacon type |
| `policy` | `BeaconPolicy` | Access policy for all |

**Route:** `POST /clients/vaults/:id/beacons/bulk_create`

### `delete(vaultId, beaconId)`

Delete a beacon.

```typescript
client.beacons.delete(vaultId: string, beaconId: string): Promise<void>
```

**Route:** `DELETE /clients/vaults/:id/beacons/:beacon_id`

### `preview(token)`

Preview a beacon without redeeming it.

```typescript
client.beacons.preview(token: string): Promise<BeaconPreview>
```

**Route:** `GET /beacons/preview`
