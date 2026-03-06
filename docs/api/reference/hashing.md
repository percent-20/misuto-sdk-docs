# Hashing Utilities

## Import

```typescript
import { hashHex, buildHashes, buildStomp } from '@percent20/misuto-react-native-sdk';
```

## hashHex

SHA-256 hash any stringifiable value.

```typescript
function hashHex(value: unknown): string | null
```

- Returns a 64-character hex string
- Returns `null` for `null` or `undefined`
- Uses `crypto-js` internally

```typescript
hashHex('hello');     // '2cf24dba5fb0a30e...'
hashHex(42);          // SHA-256 of "42"
hashHex(null);        // null
```

## buildHashes

Generate an array of SHA-256 hashes from sensor and signal data.

```typescript
function buildHashes(input: SignalInput): string[]
```

Returns one hash per geohash precision level (1-12), multiplied by time values when `timeOfDay` is selected.

## buildStomp

Concatenate all hashes from `buildHashes` into a single string.

```typescript
function buildStomp(input: SignalInput): string
```

The stomp is sent to `POST /sentinal` for vault discovery.

## buildVaultHashes

Generate all SHA-256 hashes for V3 vault creation. This mirrors the server's `Vault#generate_vault_hashes` so raw signals never leave the device.

```typescript
function buildVaultHashes(input: VaultHashInput): string[]
```

Returns an array of 64-character hex strings covering every valid combination of the provided signals across the geohash radius.

```typescript
import { buildVaultHashes } from '@percent20/misuto-react-native-sdk';

// Location-only vault
const hashes = buildVaultHashes({
  geohash: 'sv8wrqpg5',
  radius: 100,
  salt: 'device-salt-hash',
  pepper: 'device-pepper-hash',
});

// Location + WiFi + time-based vault
const hashes = buildVaultHashes({
  geohash: 'u4pruydqqvj8',
  radius: 50,
  altitude: 42,
  hourRange: [9, 17],
  salt: 'device-salt-hash',
  pepper: 'device-pepper-hash',
  wifiSsids: ['OfficeWiFi', 'CorpNet'],
  bleDeviceNames: ['Beacon-01'],
});

// Use with V3 vault creation
const vault = await client.vaults.createV3({
  name: 'My Vault',
  engine: 'storage',
  vault_hashes: hashes,
  radius: 100,
});
```

### How It Works

1. **Geohash expansion** — `Geohash.generateOptimizedGeohashes()` finds all geohash cells covering the radius
2. **Altitude buffer** — ±min(altitude×0.1, 10) integer range
3. **Heading range** — ±5 degrees
4. **Hour expansion** — Each hour in the range
5. **Signal strings** — WiFi SSIDs + BLE names sorted/lowercased, object labels sorted/lowercased, NFC tags sorted/lowercased
6. **Hash** — For each (geohash × altitude × heading × hour) combination:
   `SHA256(accountKey + salt + pepper + location + time + devices + objects + freeText + nfc)`

### V2 vs V3

| | V2 (`create`) | V3 (`createV3`) |
|---|---|---|
| **Hash computation** | Server-side | Client-side via `buildVaultHashes()` |
| **Data sent** | Raw signals (geohash, WiFi, BLE, etc.) | Pre-computed SHA-256 hashes only |
| **Privacy** | Server sees raw signals | Server sees only opaque hashes |
| **Discovery** | Unchanged (stomp → sentinel) | Unchanged (stomp → sentinel) |

## Algorithm

1. **Base key** — `accountKey` or `sha256(salt) + sha256(pepper)`
2. **Location** — Geohash sliced at each precision (1 to 12 chars)
3. **Time** — Current UTC hour (if `timeOfDay` selected)
4. **Devices** — Sorted WiFi SSIDs + BLE names
5. **Objects** — Sorted object detection labels
6. **Free text** — Raw password string
7. **NFC** — Sorted NFC tag IDs
8. **Hash** — `SHA256(baseKey + location + time + devices + objects + freeText + nfc)`
