# Beacon Policy Utilities

Three exported functions for working with beacon policies.

## Import

```typescript
import {
  normalizeBeaconPolicy,
  requiredCardIdsFromBeaconPolicy,
  summarizeBeaconPolicy,
} from '@percent20/misuto-react-native-sdk';
```

## normalizeBeaconPolicy

Normalize a raw policy object to a standard shape. Handles both `snake_case` and `camelCase` fields.

```typescript
function normalizeBeaconPolicy(policy: any): {
  require_signals: string[];
  constraints: Record<string, any>;
} | null
```

Returns `null` if input is falsy or not an object.

## requiredCardIdsFromBeaconPolicy

Extract the signal card IDs required by a policy.

```typescript
function requiredCardIdsFromBeaconPolicy(policy: any): string[]
```

### Signal-to-Card Mappings

| Signal / Constraint | Card ID |
|---------------------|---------|
| `location` | `'location'` |
| `time_of_day` / `time` | `'timeOfDay'` |
| `nearby_devices` / `wifi_ssids` / `ble_device_names` | `'nearbyDevices'` |
| `objects_around_me` / `object_detection` | `'objectDetection'` |
| `nfcTags` / `nfc_tags` / `nfc_tag_ids` | `'nfcTags'` |
| `free_text` | `'freeText'` |
| `device_specific_keys` | `'deviceSpecificKeys'` |

## summarizeBeaconPolicy

Generate human-readable summary strings.

```typescript
function summarizeBeaconPolicy(policy: any): string[]
```

Example output:

```typescript
[
  'Location',
  'Time Window',
  'Join within 30 minutes',
  'Wi-Fi must include: OfficeNet',
  'NFC tags required',
]
```
