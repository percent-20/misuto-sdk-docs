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

## Algorithm

1. **Base key** — `accountKey` or `sha256(salt) + sha256(pepper)`
2. **Location** — Geohash sliced at each precision (1 to 12 chars)
3. **Time** — Current UTC hour (if `timeOfDay` selected)
4. **Devices** — Sorted WiFi SSIDs + BLE names
5. **Objects** — Sorted object detection labels
6. **Free text** — Raw password string
7. **NFC** — Sorted NFC tag IDs
8. **Hash** — `SHA256(baseKey + location + time + devices + objects + freeText + nfc)`
