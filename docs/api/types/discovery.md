# Discovery Types

## DiscoveryConfig

```typescript
interface DiscoveryConfig {
  pollingIntervalMs?: number;    // Default: 2500
  salt?: string;
  pepper?: string;
  accountKey?: string;
  onVaultEnter?: (vault: DiscoveredVault) => void;
  onVaultExit?: (vault: DiscoveredVault) => void;
}
```

## DiscoveryEvent

```typescript
interface DiscoveryEvent {
  type: 'enter' | 'exit';
  vault: DiscoveredVault;
  timestamp: number;
}
```

## SignalState

Controls which signals are included in discovery hashing:

```typescript
interface SignalState {
  selectedKeys: string[];
  freeText?: string;
  objectDetection?: string[];
  nfcTags?: string[];
  useAltitude?: boolean;
  useHeading?: boolean;
}
```

### Available Signal Keys

| Key | Description |
|-----|-------------|
| `'location'` | GPS geohash |
| `'timeOfDay'` | Current hour (UTC) |
| `'nearbyDevices'` | BLE + WiFi signals |
| `'objectDetection'` | Camera object labels |
| `'freeText'` | User-entered password |
| `'nfcTags'` | NFC tag IDs |
