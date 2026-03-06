# Beacons

Beacons are shareable access tokens that grant entry to a vault without being physically present. They support policies for time-limited access, device requirements, and more.

## Creating Beacons

```typescript
const client = useMisuto();

// Create a single beacon
const beacon = await client.beacons.create(vaultId, {
  name: 'Team Access',
  type: 'wormhole',
  policy: {
    required_signals: ['location'],
    constraints: {
      time: { mode: 'within_minutes_from_now', minutes: 60 },
    },
  },
});

console.log('Share this token:', beacon.token);
```

## Beacon Types

| Type | Description |
|------|-------------|
| `'wormhole'` | One-time use access to a vault |
| `'conversation'` | Persistent access to a CHAT vault |

## Bulk Creation

Create multiple beacons at once:

```typescript
const result = await client.beacons.bulkCreate(vaultId, {
  count: 50,
  type: 'wormhole',
  policy: {
    required_signals: ['location', 'timeOfDay'],
  },
});

console.log(`Created: ${result.created}, Failed: ${result.failed}`);
console.log('Download CSV:', result.download_url);
```

## Beacon Policies

Policies define what signals or conditions a beacon requires to be redeemed.

```typescript
interface BeaconPolicy {
  required_signals?: string[];
  constraints?: {
    time?: TimeConstraint;
    wifi_ssids?: DeviceConstraint;
    ble_device_names?: DeviceConstraint;
    free_text?: string;
    nfc_tag_ids?: string[];
    object_detection?: string[];
  };
}
```

### Time Constraints

```typescript
// Must redeem within 30 minutes
{ mode: 'within_minutes_from_now', minutes: 30 }

// Must redeem during a time range
{ mode: 'range', start: '2024-01-01T09:00:00Z', end: '2024-01-01T17:00:00Z' }
```

### Device Constraints

```typescript
// Must be connected to specific WiFi
{ wifi_ssids: { contains_all: ['OfficeNet'] } }

// Must be near specific BLE devices
{ ble_device_names: { contains_all: ['Conference-Room-A'] } }
```

## Listing Beacons

```typescript
const response = await client.beacons.list(vaultId, {
  page: 1,
  per_page: 20,
  status: 'unredeemed', // or 'redeemed', 'expired'
});

response.beacons.forEach(b => {
  console.log(`${b.token}: ${b.status}`);
});
```

## Previewing a Beacon

Check a beacon's status without redeeming it:

```typescript
const preview = await client.beacons.preview('beacon-token-abc');

console.log('Vault:', preview.vault.name);
console.log('Status:', preview.status);
console.log('Policy:', preview.policy);
```

## Policy Utilities

The SDK provides helpers for working with beacon policies:

```typescript
import {
  normalizeBeaconPolicy,
  requiredCardIdsFromBeaconPolicy,
  summarizeBeaconPolicy,
} from '@percent20/misuto-react-native-sdk';

// Normalize various formats to a standard shape
const normalized = normalizeBeaconPolicy(rawPolicy);

// Get required signal card IDs
const cards = requiredCardIdsFromBeaconPolicy(policy);
// ['location', 'timeOfDay', 'nearbyDevices']

// Get human-readable summaries
const summaries = summarizeBeaconPolicy(policy);
// ['Location', 'Time Window', 'Join within 30 minutes', 'Wi-Fi must include: OfficeNet']
```

## Deleting Beacons

```typescript
await client.beacons.delete(vaultId, beaconId);
```
