# Signal Hashing

The SDK uses SHA-256 hashing to securely match devices to vaults without exposing raw location data.

## Overview

The hashing system converts sensor readings and user-provided signals into a deterministic hash string called a "stomp." The server matches these hashes against vault shard hashes to determine which vaults are nearby.

## Core Functions

### `hashHex(value)`

SHA-256 hash any value into a hex string:

```typescript
import { hashHex } from '@percent20/misuto-react-native-sdk';

hashHex('hello');       // '2cf24dba5fb0a30e...'
hashHex(42);            // 'hash of "42"'
hashHex(null);          // null
hashHex(undefined);     // null
```

### `buildHashes(input)`

Generate an array of hashes from sensor and signal data:

```typescript
import { buildHashes } from '@percent20/misuto-react-native-sdk';

const hashes = buildHashes({
  salt: 'device-salt',
  pepper: 'device-pepper',
  geohash: 'u4pruydqqvj8',
  selectedKeys: ['location', 'timeOfDay'],
});

// Returns 12 hashes (one per geohash precision level)
console.log(hashes.length); // 12
```

### `buildStomp(input)`

Concatenate all hashes into a single stomp string:

```typescript
import { buildStomp } from '@percent20/misuto-react-native-sdk';

const stomp = buildStomp({
  salt: 'device-salt',
  pepper: 'device-pepper',
  geohash: 'u4pruydqqvj8',
  selectedKeys: ['location'],
});

// stomp is sent to POST /sentinal
```

## SignalInput

```typescript
interface SignalInput {
  salt?: string;                          // Device-specific salt
  pepper?: string;                        // Device-specific pepper
  accountKey?: string;                    // Alternative to salt/pepper
  geohash?: string;                       // Current geohash (from GPS)
  altitude?: number | null;               // From barometer
  heading?: number | null;                // From magnetometer
  useAltitude?: boolean;                  // Include altitude in hash
  useHeading?: boolean;                   // Include heading in hash
  selectedKeys: string[];                 // Which signal types to use
  wifiNetworks?: Array<{ SSID: string }>; // Nearby WiFi
  bleDevices?: Array<{ name: string }>;   // Nearby BLE devices
  objectDetection?: string[];             // Detected object labels
  freeText?: string;                      // User-entered password
  nfcTags?: string[];                     // Scanned NFC tag IDs
}
```

## Hash Construction Algorithm

1. **Base key:** Either `accountKey` or `sha256(salt) + sha256(pepper)`
2. **Location:** Geohash at multiple precision levels (1 to 12 characters)
3. **Time:** Current hour in UTC (if `timeOfDay` is selected)
4. **Devices:** Sorted WiFi SSIDs and BLE names (if `nearbyDevices` is selected)
5. **Objects:** Sorted object detection labels
6. **Free text:** Raw password string
7. **NFC:** Sorted NFC tag IDs
8. **Final hash:** `SHA256(baseKey + locationSlice + time + devices + objects + freeText + nfc)`

The system generates one hash per precision level, so 12 hashes total per time value. This allows the server to match at different geospatial granularities.

## V3: Client-Side Vault Hash Generation

Starting with SDK v0.2.0, you can create vaults with **client-side hash generation**. Instead of sending raw signals (WiFi SSIDs, BLE names, geohash, etc.) to the server, the SDK computes all SHA-256 hashes locally and sends only the resulting hash array.

### Why V3?

- Raw discovery signals **never leave the device**
- The server receives only opaque 64-character hex strings
- Vault discovery via sentinel is unchanged — both V2 and V3 vaults are discoverable

### `buildVaultHashes(input)`

```typescript
import { buildVaultHashes } from '@percent20/misuto-react-native-sdk';

const hashes = buildVaultHashes({
  geohash: 'sv8wrqpg5',
  radius: 100,
  altitude: 42,
  salt: 'device-salt-hash',
  pepper: 'device-pepper-hash',
  wifiSsids: ['OfficeWiFi'],
  bleDeviceNames: ['Beacon-01'],
  hourRange: [9, 17],
});

// Create vault — only hashes are sent to the server
const vault = await client.vaults.createV3({
  name: 'My Vault',
  engine: 'storage',
  vault_hashes: hashes,
  radius: 100,
});
```

The function generates all valid hash combinations by expanding:

1. Geohash cells covering the radius (via `Geohash.generateOptimizedGeohashes`)
2. Altitude ±10% buffer as integer range
3. Heading ±5 degrees
4. Each hour in the hour range
5. Sorted/lowercased device, object, NFC, and free text strings

Each combination is hashed as: `SHA256(accountKey + salt + pepper + location + time + devices + objects + freeText + nfc)`

See [`VaultHashInput`](/api/types/hashing#vaulthashinput) for the full type definition and [`buildVaultHashes()`](/api/reference/hashing#buildvaulthashes) for the API reference.

## Privacy Model

- Raw GPS coordinates never leave the device in discovery requests
- Only SHA-256 hashes are sent to the server
- Salt and pepper add device-specific entropy
- The server cannot reverse hashes to determine location
