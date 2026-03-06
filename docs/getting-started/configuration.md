# Configuration

The SDK is configured via the `MisutoConfig` interface passed to `MisutoClient.init()` or `<MisutoProvider>`.

## MisutoConfig

```typescript
interface MisutoConfig {
  apiKey: string;              // Required. Your API key.
  baseUrl?: string;            // Default: 'https://api.percent-20.com/api/v2'
  sensors?: SensorConfig;      // Which sensors to auto-start
  discovery?: DiscoveryConfig; // Vault discovery settings
  logLevel?: LogLevel;         // Default: 'warn'
}
```

## Sensor Configuration

Enable sensors by setting them to `true`:

```typescript
interface SensorConfig {
  gps?: boolean;            // GPS location
  ble?: boolean;            // Bluetooth Low Energy
  wifi?: boolean;           // WiFi network scanning
  nfc?: boolean;            // NFC tag reading
  magnetometer?: boolean;   // Compass heading
  barometer?: boolean;      // Atmospheric pressure / altitude
  camera?: boolean;         // Object detection (API-driven)
  accelerometer?: boolean;  // Motion / shake detection
}
```

Sensors are loaded lazily — the native dependency is only `require()`'d when the sensor starts. If the native module isn't installed, `isAvailable()` returns `false`.

## Discovery Configuration

```typescript
interface DiscoveryConfig {
  pollingIntervalMs?: number;  // Default: 2500 (2.5 seconds)
  salt?: string;               // Device-specific salt for hashing
  pepper?: string;             // Device-specific pepper for hashing
  accountKey?: string;         // Account key (alternative to salt/pepper)
  onVaultEnter?: (vault: DiscoveredVault) => void;
  onVaultExit?: (vault: DiscoveredVault) => void;
}
```

## Log Levels

Available levels, in order of verbosity:

| Level | Description |
|-------|-------------|
| `'debug'` | All messages including internal diagnostics |
| `'info'` | Initialization, connection events |
| `'warn'` | Warnings (default) |
| `'error'` | Errors only |
| `'none'` | Silent |

## Full Example

```typescript
import { MisutoClient } from '@percent20/misuto-react-native-sdk';

const client = MisutoClient.init({
  apiKey: 'pk_live_abc123',
  baseUrl: 'https://api.percent-20.com/api/v2',
  sensors: {
    gps: true,
    ble: true,
    wifi: true,
  },
  discovery: {
    pollingIntervalMs: 3000,
    salt: 'device-unique-salt',
    pepper: 'device-unique-pepper',
    onVaultEnter: (vault) => console.log('Entered:', vault.name),
    onVaultExit: (vault) => console.log('Exited:', vault.name),
  },
  logLevel: 'info',
});
```

## Next Steps

- [Provider Setup](/getting-started/provider-setup) — use the React context provider
- [Your First Vault](/getting-started/first-vault) — end-to-end walkthrough
