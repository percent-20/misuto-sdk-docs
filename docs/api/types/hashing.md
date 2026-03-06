# Hashing Types

## SignalInput

Input for the signal hashing functions:

```typescript
interface SignalInput {
  salt?: string;
  pepper?: string;
  accountKey?: string;
  geohash?: string;
  altitude?: number | null;
  heading?: number | null;
  useAltitude?: boolean;
  useHeading?: boolean;
  selectedKeys: string[];
  wifiNetworks?: Array<{ SSID: string }>;
  bleDevices?: Array<{ name: string }>;
  objectDetection?: string[];
  freeText?: string;
  nfcTags?: string[];
}
```

## VaultHashInput

Input for client-side vault hash generation (V3):

```typescript
interface VaultHashInput {
  geohash?: string;
  radius?: number;
  altitude?: number;
  heading?: number;
  hourRange?: [number, number];
  salt?: string;
  pepper?: string;
  accountKey?: string;
  wifiSsids?: string[];
  bleDeviceNames?: string[];
  objectDetection?: string[];
  freeText?: string;
  nfcTagIds?: string[];
}
```

| Field | Type | Description |
|-------|------|-------------|
| `geohash` | `string` | Center geohash for the vault location |
| `radius` | `number` | Radius in meters — controls geohash precision coverage |
| `altitude` | `number` | Altitude in meters (generates ±10% buffer range) |
| `heading` | `number` | Compass heading in degrees (generates ±5° range) |
| `hourRange` | `[number, number]` | Hour range, e.g. `[9, 17]` for business hours |
| `salt` | `string` | Device-specific salt |
| `pepper` | `string` | Device-specific pepper |
| `accountKey` | `string` | Alternative to salt/pepper for device binding |
| `wifiSsids` | `string[]` | Required WiFi network names |
| `bleDeviceNames` | `string[]` | Required BLE device names |
| `objectDetection` | `string[]` | Required object detection labels |
| `freeText` | `string` | Free text password |
| `nfcTagIds` | `string[]` | Required NFC tag IDs |

## HashConfig

```typescript
interface HashConfig {
  maxPrecision?: number;
}
```
