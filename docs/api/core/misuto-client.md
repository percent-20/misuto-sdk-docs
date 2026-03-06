# MisutoClient

The central singleton client that initializes and provides access to all SDK subsystems.

## Import

```typescript
import { MisutoClient } from '@percent20/misuto-react-native-sdk';
```

## Static Methods

### `MisutoClient.init(config)`

Initialize the singleton client.

```typescript
static init(config: MisutoConfig): MisutoClient
```

| Param | Type | Description |
|-------|------|-------------|
| `config` | `MisutoConfig` | SDK configuration (apiKey required) |

Returns the `MisutoClient` instance. If already initialized, warns and returns the existing instance.

Throws `ConfigError` if `apiKey` is empty.

### `MisutoClient.getInstance()`

Get the existing singleton instance.

```typescript
static getInstance(): MisutoClient
```

Throws `ConfigError` if not yet initialized.

## Instance Properties

| Property | Type | Description |
|----------|------|-------------|
| `http` | `HttpClient` | HTTP client for API requests |
| `sensors` | `SensorManager` | Sensor management |
| `discovery` | `VaultDiscovery` | Vault discovery system |
| `interactions` | `VaultInteraction` | Vault interactions (chat, storage, MFA) |
| `vaults` | Vaults API | CRUD operations for vaults |
| `beacons` | Beacons API | Beacon management |
| `statistics` | Statistics API | Usage statistics |
| `enterprise` | Enterprise APIs | SSO, MFA, admin |

### `enterprise` Sub-properties

| Property | Type | Description |
|----------|------|-------------|
| `enterprise.mfa` | Enterprise MFA API | MFA validation |
| `enterprise.providers` | Providers API | SSO provider management |
| `enterprise.connections` | Connections API | User-provider connections |
| `enterprise.admin` | Admin API | Tenant and user management |

## Instance Methods

### `getRateLimits()`

```typescript
getRateLimits(): RateLimits
```

Returns the current rate limit state from API response headers.

### `destroy()`

```typescript
destroy(): void
```

Stops discovery, destroys sensors, and clears the singleton instance.

## Automatic Wiring

On initialization, the client automatically wires sensor readings to the discovery system:

- GPS readings → `discovery.updateGps()`
- BLE readings → `discovery.updateBleDevices()`
- WiFi readings → `discovery.updateWifiNetworks()`

## Example

```typescript
const client = MisutoClient.init({
  apiKey: 'pk_live_abc123',
  sensors: { gps: true, ble: true },
  discovery: { pollingIntervalMs: 3000 },
  logLevel: 'info',
});

// Use subsystems
client.discovery.start();
const vaults = await client.vaults.list();

// Clean up
client.destroy();
```
